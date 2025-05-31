import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { TranslateModule } from '@ngx-translate/core'
import { AsyncPipe } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'

@Component({
  selector: 'app-auth-popup',
  imports: [TranslateModule, AsyncPipe, LoginComponent, RegistrationComponent, AsyncPipe],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPopupComponent {
  constructor(public authService: AuthService) {}

  @HostBinding('class.fade-out') hostFade = false

  public close(): void {
    this.hostFade = true
    setTimeout(() => {
      this.authService.closePopup()
      this.hostFade = false
    }, 300)
  }
}
