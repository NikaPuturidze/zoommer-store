import { Component, Input, SimpleChanges, ViewChild } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AuthService } from '../../services/auth.service'
import { AsyncPipe } from '@angular/common'
import { WithNumberComponent } from './with-number/with-number.component'
import { WithEmailComponent } from './with-email/with-email.component'
import { CodeVerifyComponent } from './code-verify/code-verify.component'

@Component({
  selector: 'app-login',
  imports: [TranslateModule, AsyncPipe, WithNumberComponent, WithEmailComponent, CodeVerifyComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() active = false

  @ViewChild(WithNumberComponent) withNumberComp?: WithNumberComponent
  @ViewChild(WithEmailComponent) withEmailComp?: WithEmailComponent
  @ViewChild(CodeVerifyComponent) codeVerifyComp?: CodeVerifyComponent

  constructor(public authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('active' in changes && !changes['active'].currentValue) {
      this.withNumberComp?.cleanup()
      this.withEmailComp?.cleanup()
      this.codeVerifyComp?.cleanup()
    }
  }
}
