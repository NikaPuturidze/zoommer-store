import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

export const profileGuard: CanActivateFn = () => {
  const router = inject(Router)
  const token = inject(CookieService).get('user-authed')

  if (!token) {
    router.navigateByUrl(router.url).catch((error: unknown) => {
      console.error(error)
    })
    return false
  }

  return true
}
