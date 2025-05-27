import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(CookieService).get('access-token')

  if (token)
    request = request.clone({
      headers: request.headers.set('authorization', `Bearer ${token}`),
    })

  return next(request)
}
