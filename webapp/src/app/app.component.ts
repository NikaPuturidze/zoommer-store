import { Component, Input } from '@angular/core'
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() topics?: ITopicsResponse
  public viewportWidth = 0
  public allGood?: boolean

  constructor(
    private apiService: ApiService,
    private translate: TranslateService,
    private router: Router,
    private viewport: ViewportService,
    private tokenService: TokenService,
    private burgerService: BurgerService,
    public authService: AuthService
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

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0)
      }
    })

    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
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
