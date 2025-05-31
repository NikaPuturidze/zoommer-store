import { Component, HostBinding, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { BurgerService } from '../services/burger.service'
import { ApiService } from '../services/api.service'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'
import { fromEvent, map, throttleTime } from 'rxjs'
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { AuthService } from '../services/auth.service'

@UntilDestroy()
@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public currentLang = 'ka'
  public currentLanguage = ''
  public navigation = ''
  public cart = ''
  public search = ''
  public logIn = ''
  public currentFlag = ''
  public isLanguageMenuOpen = false

  @HostBinding('class.sticky') isSticky = false

  constructor(
    private translateService: TranslateService,
    private burgerService: BurgerService,
    private apiService: ApiService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((change: LangChangeEvent) => {
      this.currentLang = change.lang
      this.currentFlag = `https://zoommer.ge/icons/footer/${this.currentLang === 'en' ? 'en.svg' : 'flag-geo.png'}`
    })
    this.listenToScroll()
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
    this.translateService.use(this.currentLang === 'en' ? 'ka' : 'en')
    this.isLanguageMenuOpen = false
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
