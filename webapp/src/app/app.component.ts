import { ChangeDetectorRef, Component, Input } from '@angular/core'
import { NavigationComponent } from './navigation/navigation.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { ApiService } from './services/api.service'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { ViewportService } from './services/viewport.service'
import { BurgerComponent } from './burger/burger.component'
import { TokenService } from './services/token.service'
import { TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { AuthPopupComponent } from './auth-popup/auth-popup.component'
import { AuthService } from './services/auth.service'
import { AsyncPipe } from '@angular/common'
import { BottomBarComponent } from './bottom-bar/bottom-bar.component'
import { IMegaMenu } from '../interfaces/mega-menu.interface'
import { BurgerService } from './services/burger.service'
import { SearchPopupComponent } from './search-popup/search-popup.component'
import { SearchService } from './services/search.service'
import { filter } from 'rxjs'
import { CartService } from './services/cart.service'
import { CookieService } from 'ngx-cookie-service'
import { ICart } from '../interfaces/cart.interface'
import { IWishList } from '../interfaces/wishlist.interface'

@UntilDestroy()
@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    BurgerComponent,
    AuthPopupComponent,
    AsyncPipe,
    BottomBarComponent,
    SearchPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() topics?: ITopicsResponse
  public viewportWidth = 0
  public allGood?: boolean
  public visible = false
  public isOut = false

  constructor(
    private apiService: ApiService,
    private translate: TranslateService,
    private viewport: ViewportService,
    private tokenService: TokenService,
    private burgerService: BurgerService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    public authService: AuthService,
    public searchService: SearchService,
    public cartService: CartService,
    public cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ka'])
    const language = window.localStorage.getItem('language')
    if (!language) {
      window.localStorage.setItem('language', 'ka')
    } else this.translate.use(language)

    this.tokenService
      .setAccessToken()
      .then((result) => {
        this.allGood = result
        this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
          this.loadTopics()
        })
      })
      .catch((error: unknown) => {
        console.error(error)
      })

    if (this.cookie.get('user-authed') && this.cookie.get('access-token') && !this.cartService.cart$.value) {
      this.apiService.cart().subscribe({
        next: (data: ICart) => {
          this.cartService.setCart(data)
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
      this.apiService.wishlist().subscribe({
        next: (data: IWishList) => {
          this.cartService.setWishlist(data)
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
    }

    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0)
      }
    })

    this.router.events
      .pipe(filter((element): element is NavigationEnd => element instanceof NavigationEnd))
      .pipe(untilDestroyed(this))
      .subscribe((event) => {
        this.visible = event.url === '/search'
        this.updateVisibility()
      })

    this.viewport.Viewport$.pipe(untilDestroyed(this)).subscribe(({ width }) => {
      this.viewportWidth = width
      this.updateVisibility()
    })

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

  private updateVisibility(): void {
    this.visible = !this.visible && this.viewportWidth > 1024
    this.cdr.detectChanges()
  }

  private loadTopics(): void {
    this.apiService.topics().subscribe({
      next: (data: ITopicsResponse) => {
        this.topics = data
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load topics', error)
      },
    })
  }
}
