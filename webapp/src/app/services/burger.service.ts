import { Injectable } from '@angular/core'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BurgerService {
  public megaMenuSubject = new BehaviorSubject<IMegaMenu[] | undefined>(undefined)
  public burgerTranslate = new BehaviorSubject<number>(-100)

  public setMegaMenu(megaMenu: IMegaMenu[] | undefined): void {
    this.megaMenuSubject.next(megaMenu)
  }

  public getMegaMenu(): Observable<IMegaMenu[] | undefined> {
    return this.megaMenuSubject.asObservable()
  }

  public setBurger(translate: number): void {
    this.burgerTranslate.next(translate)
  }

  public getBurger(): Observable<number> {
    return this.burgerTranslate.asObservable()
  }
}
