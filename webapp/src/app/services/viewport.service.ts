import { Injectable, NgZone } from '@angular/core'
import { BehaviorSubject, fromEvent, Observable } from 'rxjs'
import { debounceTime, map, startWith, distinctUntilChanged } from 'rxjs/operators'

export interface ViewportSize {
  width: number
  height: number
}

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private viewportSubject = new BehaviorSubject<ViewportSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  public readonly Viewport$: Observable<ViewportSize> = this.viewportSubject.asObservable()

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(10),
          map(() => ({
            width: window.innerWidth,
            height: window.innerHeight,
          })),
          distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
          startWith({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        )
        .subscribe((size) => {
          this.ngZone.run(() => {
            this.viewportSubject.next(size)
          })
        })
    })
  }
}
