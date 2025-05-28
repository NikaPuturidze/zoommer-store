import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './services/interceptors/auth-interceptor.service'
import { languageInterceptor } from './services/interceptors/language-interceptor.service'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { requestDedupInterceptor as requestInterceptor } from './services/interceptors/request-interceptor.service'

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/locale/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, languageInterceptor, requestInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
}
