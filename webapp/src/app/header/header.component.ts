import { Component, HostBinding, HostListener, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { BurgerService } from '../services/burger.service'
import { debounceTime, distinctUntilChanged, fromEvent, map, throttleTime } from 'rxjs'
import { LangChangeEvent, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { AuthService } from '../services/auth.service'
import { SearchService } from '../services/search.service'
import { ReactiveFormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { CartService } from '../services/cart.service'

@UntilDestroy()
@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, TranslateModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public currentLang = 'ka'
  public currentFlag = ''
  public isLanguageMenuOpen = false

  @HostBinding('class.sticky') isSticky = false

  constructor(
    private translateService: TranslateService,
    private burgerService: BurgerService,
    private router: Router,
    public cookie: CookieService,
    public searchService: SearchService,
    public authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((change: LangChangeEvent) => {
      this.currentLang = change.lang
      this.currentFlag = `https://zoommer.ge/icons/footer/${this.currentLang === 'en' ? 'en.svg' : 'flag-geo.png'}`
    })
    this.listenToScroll()

    this.searchService.search.valueChanges.pipe(debounceTime(350), distinctUntilChanged()).subscribe((keyword) => {
      if (keyword.search && keyword.search.length >= 3) {
        this.searchService.setValue(keyword.search)
      }
    })
  }

  @HostListener('click')
  public endSearch(): void {
    this.searchService.endSearch()
  }

  public listenToScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(25),
        map(() => window.scrollY),
        untilDestroyed(this)
      )
      .subscribe((scroll) => {
        this.isSticky = scroll >= 100
      })
  }

  public toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen
  }

  public toggleBurger(): void {
    this.burgerService.setBurger(this.burgerService.burgerTranslate.value === 0 ? -100 : 0)
  }

  public chooseLanguage(event: MouseEvent): void {
    event.stopPropagation()
    window.localStorage.setItem('language', this.translateService.currentLang === 'en' ? 'ka' : 'en')
    this.translateService.use(this.translateService.currentLang === 'en' ? 'ka' : 'en')
    this.isLanguageMenuOpen = false
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }

  public determineNavigate(): void {
    if (this.cookie.get('user-authed') && this.cookie.get('access-token')) {
      this.navigateTo(['/profile'])
    } else {
      this.authService.openPopup()
    }
  }

  public determineNavigateCart(): void {
    if (this.cookie.get('user-authed') && this.cookie.get('access-token')) {
      this.navigateTo(['/cart'])
    } else {
      this.authService.openPopup()
    }
  }
}
