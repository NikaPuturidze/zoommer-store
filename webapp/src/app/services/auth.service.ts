import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}

  public setAccessToken(): void {
    if (!this.cookieService.check('access-token')) {
      this.apiService.accessToken().subscribe({
        next: (data: { token: string }) => {
          this.cookieService.set('access-token', data.token, 4)
        },
      })
    }
  }
}
