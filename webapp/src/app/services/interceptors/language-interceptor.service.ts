import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const translateService = inject(TranslateService)
  const language = translateService.currentLang

  if (language) {
    request = request.clone({
      headers: request.headers.set('accept-language', language),
    })
  }

  return next(request)
}
