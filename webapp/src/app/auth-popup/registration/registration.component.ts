import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RegNumberComponent } from './reg-number/reg-number.component'
import { AuthService } from '../../services/auth.service'
import { RegVerifyComponent } from './reg-verify/reg-verify.component'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-registration',
  imports: [RegNumberComponent, RegVerifyComponent, AsyncPipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  constructor(public authService: AuthService) {}
}
