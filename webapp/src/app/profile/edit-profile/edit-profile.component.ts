import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { ApiService } from '../../services/api.service'
import { IProfile } from 'webapp/src/interfaces/profile.interface'
import { MatRippleModule } from '@angular/material/core'
import { IRenew } from 'webapp/src/interfaces/renew.interface'
import { PulseLoaderComponent } from '../../ui/loaders/pulse-loader/pulse-loader.component'
import { AuthService } from '../../services/auth.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Router } from '@angular/router'

@UntilDestroy()
@Component({
  selector: 'app-edit-profile',
  imports: [TranslateModule, ReactiveFormsModule, MatRippleModule, PulseLoaderComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  public edit?: FormGroup
  public currentEdit = -1
  public toggleState = false
  public showLoading = false
  public infoChange = true
  public showInfoChange = false
  public profile: IProfile | null = null

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .getProfile()
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.profile = value

        if (this.profile) this.fillData(this.profile)
        if (!this.profile) this.loadProfile()
      })
  }

  @ViewChildren('formInput') inputs?: QueryList<ElementRef<HTMLInputElement>>

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    const clickedInsideInputContainer = target.closest('.input-container')

    if (!clickedInsideInputContainer) {
      this.currentEdit = -1
    }
  }

  private fillData(data: IProfile): void {
    this.edit = new FormGroup<{
      phone: FormControl<string | null>
      email: FormControl<string | null>
      name: FormControl<string | null>
      surname: FormControl<string | null>
      id: FormControl<string | null>
    }>({
      phone: new FormControl(data.phone),
      email: new FormControl(data.email),
      name: new FormControl(data.name),
      surname: new FormControl(data.lastName),
      id: new FormControl(data.personalNumber),
    })

    this.toggleState = data.citizenOfAnotherCountry

    setTimeout(() => {
      if (this.inputs) {
        const firstFocusable = this.inputs.find(
          (input) => input?.nativeElement?.offsetParent !== null && !input.nativeElement.disabled
        )
        firstFocusable?.nativeElement.focus()
      }
    })
  }

  private loadProfile(): void {
    this.apiService
      .profile()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data: IProfile) => {
          this.authService.setProfile(data)
          this.authService.setName(data.name)
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
  }

  public startChange(index: number, event: Event): void {
    event.stopPropagation()
    event.preventDefault()
    const isSame = this.currentEdit === index
    this.currentEdit = isSame ? -1 : index

    if (!isSame) {
      setTimeout(() => {
        const input = this.inputs?.get(index)
        input?.nativeElement.focus()
      })
    }
  }

  public stopChange(): void {
    this.currentEdit = -1
  }

  public toggleSwitcher(): void {
    this.toggleState = !this.toggleState
  }

  public onSubmit(): void {
    this.renew()
  }

  private renew(): void {
    this.showLoading = true
    const { email, name, surname, id } = this.edit?.value as {
      email: string
      name: string
      surname: string
      id: string
    }

    this.apiService
      .renew(this.toggleState, email, surname, name, id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data: IRenew) => {
          if (data.success) {
            this.setInfoChange()
            this.loadProfile()
          } else this.infoChange = false

          this.showLoading = false
        },
        error: (error: unknown) => {
          console.error(error)
          this.infoChange = false
          this.showLoading = false
          this.setInfoChange()
        },
      })
  }

  public setInfoChange(): void {
    this.showInfoChange = true

    setTimeout(() => {
      this.showInfoChange = false
    }, 2000)
  }
}
