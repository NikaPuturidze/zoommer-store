import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslatePipe } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service'
import { ApiService } from 'webapp/src/app/services/api.service'
import { AuthService } from 'webapp/src/app/services/auth.service'
import { ILogin } from 'webapp/src/interfaces/login.interface'
import { IUser } from 'webapp/src/interfaces/user.interface'

@Component({
  selector: 'app-code-verify',
  imports: [ReactiveFormsModule, TranslateModule, TranslatePipe],
  templateUrl: './code-verify.component.html',
  styleUrl: './code-verify.component.scss',
})
export class CodeVerifyComponent implements OnInit {
  public verify?: FormGroup
  public loadResend = false
  public codeSent = false
  public resendResponse = 'sendAgain'
  public data?: IUser
  public wrongCode = false
  public displayMsg = ''
  public showError = false

  @ViewChild('code') code?: ElementRef<HTMLInputElement>

  constructor(
    private apiservice: ApiService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.verify = new FormGroup<{ code: FormControl<number | null> }>({
      code: new FormControl(null, [Validators.required]),
    })
  }

  public focusCode(): void {
    if (this.code) this.code.nativeElement.focus()
  }

  public onSubmit(): void {
    if (this.verify?.valid) {
      this.login(String(this.verify?.get('code')?.value))
    } else {
      this.showError = true
    }
  }

  public inputChange(): void {
    this.showError = false
  }

  public resendCode(): void {
    this.loadResend = true
    this.resendResponse = 'sendAgain'
    this.cdr.markForCheck()

    if (this.authService.sentUsername) {
      this.apiservice.user(this.authService.sentUsername).subscribe({
        next: (data: IUser) => {
          this.data = data
          this.codeSent = true
          this.resendResponse = data.success ? 'sended' : 'error'
          this.loadResend = false
          this.cdr.markForCheck()
        },
        error: (error: unknown) => {
          console.error(error)
          this.data = undefined
          this.codeSent = true
          this.resendResponse = 'error'
          this.loadResend = false
          this.cdr.markForCheck()
        },
      })
    }
  }

  private login(code: string): void {
    if (this.authService.sentUsername) {
      this.apiservice.login(this.authService.sentUsername, code).subscribe({
        next: (data: ILogin) => {
          if (!data.success) {
            this.displayMsg = data.userMessage
          }
          if (data.accessToken != null) {
            this.cookie.set('access-token', data.accessToken)
          }
          this.cdr.markForCheck()
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
    }
  }

  public cleanup(): void {
    this.verify?.reset()
    this.loadResend = false
    this.codeSent = false
    this.resendResponse = 'sendAgain'
    this.data = undefined
    this.displayMsg = ''
  }
}
