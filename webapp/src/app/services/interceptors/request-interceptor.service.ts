import { HttpInterceptorFn, HttpEvent } from '@angular/common/http'
import { Observable, shareReplay, finalize } from 'rxjs'

const inflightRequests = new Map<string, Observable<HttpEvent<unknown>>>()

export const requestDedupInterceptor: HttpInterceptorFn = (request, next) => {
  const key = request.method + '::' + request.urlWithParams

  if (inflightRequests.has(key)) {
    return inflightRequests.get(key)!
  }

  const request$ = next(request).pipe(
    shareReplay(1),
    finalize(() => inflightRequests.delete(key))
  )

  inflightRequests.set(key, request$)

  return request$
}
