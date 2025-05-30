import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core'
import { AuthService } from '../services/auth.service'
import { TranslateModule } from '@ngx-translate/core'
import { AsyncPipe } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'
import { ViewportService } from '../services/viewport.service'
import { BehaviorSubject, combineLatest } from 'rxjs'

@Component({
  selector: 'app-auth-popup',
  imports: [TranslateModule, AsyncPipe, LoginComponent, RegistrationComponent, AsyncPipe],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPopupComponent implements AfterViewInit {
  @HostBinding('class.fade-out') hostFade = false
  @ViewChild('section') section?: ElementRef<HTMLInputElement>

  public closing = new BehaviorSubject<boolean>(false)

  constructor(
    public authService: AuthService,
    public viewport: ViewportService,
    public cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.handleAnimations()
  }

  private handleAnimations(): void {
    const sectionElement = this.section?.nativeElement
    if (!sectionElement) return

    combineLatest([this.viewport.Viewport$, this.authService.popupVisibility$, this.closing]).subscribe(
      ([viewport, popupVisible, closing]) => {
        const isDesktop = viewport.width > 1024

        const enterClass = isDesktop ? 'fade-in-sb' : 'fade-in-s'
        const exitClass = 'fade-out-s'

        const handleAnimationEnd = (callback: () => void) => {
          const onEnd = () => {
            sectionElement.removeEventListener('animationend', onEnd)
            callback()
          }
          sectionElement.addEventListener('animationend', onEnd)
        }

        if (closing) {
          sectionElement.classList.remove('fade-in-s', 'fade-in-sb')
          sectionElement.classList.add(exitClass)

          handleAnimationEnd(() => {
            sectionElement.classList.remove(exitClass)
          })

          return
        }

        if (popupVisible) {
          sectionElement.classList.remove('fade-out-s')
          sectionElement.classList.add(enterClass)
        } else {
          sectionElement.classList.remove('fade-in-s', 'fade-in-sb')
        }
      }
    )
  }

  public close(): void {
    this.hostFade = true
    this.closing.next(true)
    this.cdr.markForCheck()
    setTimeout(() => {
      this.authService.closePopup()
      this.closing.next(false)
      this.hostFade = false
    }, 300)
  }
}
