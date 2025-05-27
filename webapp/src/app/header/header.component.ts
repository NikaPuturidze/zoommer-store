import { Component, DestroyRef, HostBinding, OnInit } from '@angular/core'
import { LanguageService } from '../services/language.service'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { BurgerService } from '../services/burger.service'
import { ApiService } from '../services/api.service'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'
import { fromEvent, map, throttleTime } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public currentLang: 'en' | 'ka' = 'en'
  public currentLanguage = ''
  public navigation = ''
  public cart = ''
  public search = ''
  public logIn = ''
  public currentFlag = ''
  public isLanguageMenuOpen = false

  @HostBinding('class.sticky') isSticky = false

  constructor(
    private languageService: LanguageService,
    private burgerService: BurgerService,
    private apiService: ApiService,
    private router: Router,
    private destroy: DestroyRef
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.updateLanguageState()
    })
    this.listenToScroll()
  }

  public listenToScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(25),
        map(() => window.scrollY),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe((scroll) => {
        this.isSticky = scroll >= 100
      })
  }

  public updateLanguageState(): void {
    this.navigation = this.currentLang === 'en' ? 'Navigation' : 'ნავიგაცია'
    this.search = this.currentLang === 'en' ? 'Search' : 'ძიება'
    this.cart = this.currentLang === 'en' ? 'Cart' : 'კალათა'
    this.logIn = this.currentLang === 'en' ? 'Log In' : 'შესვლა'
    this.currentFlag = `https://zoommer.ge/icons/footer/${this.currentLang === 'en' ? 'en.svg' : 'flag-geo.png'}`
    this.currentLanguage = this.currentLang === 'en' ? 'GEO' : 'ENG'
  }

  public toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen
  }

  public toggleBurger(): void {
    this.burgerService.setBurger(this.burgerService.burgerTranslate.value === 0 ? -100 : 0)

    if (this.burgerService.megaMenuSubject.value === undefined) {
      this.apiService.megaMenu().subscribe({
        next: (data: IMegaMenu[] | undefined) => {
          this.burgerService.setMegaMenu(data)
        },
        error: (error: ErrorOptions) => {
          console.error('Failed to load mega-menu', error)
        },
      })
    }
  }

  public chooseLanguage(event: MouseEvent): void {
    event.stopPropagation()
    this.currentLang = this.currentLang === 'en' ? 'ka' : 'en'
    this.languageService.setLanguage(this.currentLang)
    this.updateLanguageState()
    this.isLanguageMenuOpen = false
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
