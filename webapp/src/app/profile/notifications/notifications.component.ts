import { Component, OnInit } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AuthService } from '../../services/auth.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { ApiService } from '../../services/api.service'

@UntilDestroy()
@Component({
  selector: 'app-notifications',
  imports: [TranslateModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  public toggleState? = false

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService
      .getProfile()
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.toggleState = value?.isSubscribed
      })
  }

  public toggleSwitcher(): void {
    this.toggleState = !this.toggleState
    this.setSubscribe(this.toggleState)
  }

  public setSubscribe(set: boolean): void {
    this.apiService.setSubscribe(set).subscribe({
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }
}
