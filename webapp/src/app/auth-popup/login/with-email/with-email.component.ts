import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { ApiService } from 'webapp/src/app/services/api.service'
import { AuthService } from 'webapp/src/app/services/auth.service'
import { MatRippleModule } from '@angular/material/core'
import { IToken } from 'webapp/src/interfaces/token.interface'
import { TitleCasePipe } from '@angular/common'

@Component({
  selector: 'app-with-email',
  imports: [ReactiveFormsModule, TranslateModule, MatRippleModule, TitleCasePipe],
  templateUrl: './with-email.component.html',
  styleUrl: './with-email.component.scss',
})
export class WithEmailComponent implements OnInit {
  public withEmail?: FormGroup
  public displayMsgEmail = false
  public displayMsgPassword = false
  public displayResponse = false
  public response = ''
  public isPasswordVisible = false
  public responseHeightAdded = false

  @ViewChild('email') email?: ElementRef<HTMLInputElement>
  @ViewChild('password') password?: ElementRef<HTMLInputElement>

  constructor(
    public authService: AuthService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.withEmail = new FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null> }>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  public focusEmail(): void {
    if (this.email) this.email.nativeElement.focus()
  }

  public focusPassword(): void {
    if (this.password) this.password.nativeElement.focus()
  }

  public togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  public onSubmit(): void {
    if (this.withEmail?.get('email')?.invalid) {
      if (!this.displayMsgEmail) {
        this.displayMsgEmail = true
        this.authService.addHeight(20)
      }
    }

    if (this.withEmail?.get('password')?.invalid) {
      if (!this.displayMsgPassword) {
        this.displayMsgPassword = true
        this.authService.addHeight(20)
      }
    }

    if (this.withEmail?.valid) {
      if (!this.responseHeightAdded) {
        this.displayResponse = true
        this.authService.addHeight(20)
        this.responseHeightAdded = true
      }
      this.login(this.withEmail.value as { email: string; password: string })
    } else {
      if (this.displayResponse) {
        this.authService.removeHeight(20)
      }
      this.displayResponse = false
    }
  }

  public emailChange(): void {
    if (this.displayMsgEmail) this.authService.removeHeight(20)

    this.displayMsgEmail = false
  }

  public passwordChange(): void {
    if (this.displayMsgPassword) this.authService.removeHeight(20)
    this.displayMsgPassword = false
  }

  private login(credintails: { email: string; password: string }): void {
    this.apiService.token(credintails).subscribe({
      next: (data: IToken) => {
        if (this.responseHeightAdded) {
          this.authService.removeHeight(20)
          this.responseHeightAdded = false
        }

        this.displayResponse = false
        this.response = data.error_description.split('_').join(' ')
        this.displayResponse = true

        if (!this.responseHeightAdded) {
          this.authService.addHeight(20)
          this.responseHeightAdded = true
        }

        this.cdr.detectChanges()
      },

      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public cleanup(): void {
    this.withEmail?.reset()
    this.displayMsgEmail = false
    this.displayMsgPassword = false
    this.displayResponse = false
    this.responseHeightAdded = false
    this.response = ''
  }
}
