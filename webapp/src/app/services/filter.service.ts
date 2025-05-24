import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public isFilterVisible$ = new BehaviorSubject<number>(101)

  public setFilter(translate: number): void {
    this.isFilterVisible$.next(translate)
  }
}
