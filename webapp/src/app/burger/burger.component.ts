import { Component, OnInit } from '@angular/core'
import { BurgerService } from '../services/burger.service'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'
import { combineLatest } from 'rxjs'
import { Router } from '@angular/router'
import { LanguageService } from '../services/language.service'

@Component({
  selector: 'app-burger',
  imports: [],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss',
})
export class BurgerComponent implements OnInit {
  public translate?: number
  public megaMenu?: IMegaMenu[]
  public categoryIndex = 0
  public currentLang: 'ka' | 'en' = 'en'

  constructor(
    private burgerService: BurgerService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.burgerService.getBurger(),
      this.burgerService.getMegaMenu(),
      this.languageService.currentLanguage$,
    ]).subscribe(([translate, megaMenu, currentLang]: [number, IMegaMenu[] | undefined, 'en' | 'ka']) => {
      this.translate = translate
      this.megaMenu = megaMenu
      this.currentLang = currentLang
    })
  }

  public toggleBurger(): void {
    this.burgerService.setBurger(this.burgerService.burgerTranslate.value === 0 ? -100 : 0)
  }

  public selectCategory(index: number): void {
    this.categoryIndex = index
  }

  public formatUrl(url: string): string {
    return url?.split('https://zoommer.ge/')[1]
  }

  public navigate(route: string[]): void {
    this.toggleBurger()
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
