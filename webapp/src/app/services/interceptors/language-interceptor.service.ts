import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LanguageService } from '../language.service'

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const languageService = inject(LanguageService)
  const language = languageService.getCurrentLanguage()

  if (language) {
    request = request.clone({
      headers: request.headers.set('accept-language', language),
    })
  }

  return next(request)
}
