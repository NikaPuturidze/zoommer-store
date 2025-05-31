import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ApiService } from './api.service'
import { lastValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}

  public async setAccessToken(): Promise<boolean> {
    if (!this.cookieService.check('access-token')) {
      try {
        const data = await lastValueFrom(this.apiService.accessToken())
        this.cookieService.set('access-token', data.token, 4)
        return true
      } catch (error: unknown) {
        console.error('access-token fetch failed', error)
        return false
      }
    }

    return true
  }
}
