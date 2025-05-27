import { Component, Input } from '@angular/core'
import { NavigationComponent } from './navigation/navigation.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { ApiService } from './services/api.service'
import { LanguageService } from './services/language.service'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { ViewportService } from './services/viewport.service'
import { BurgerComponent } from './burger/burger.component'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, HeaderComponent, FooterComponent, RouterOutlet, BurgerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() topics?: ITopicsResponse
  public currentLang: 'en' | 'ka' = 'en'
  public viewportWidth
  public allGood?: boolean

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private router: Router,
    private viewport: ViewportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .setAccessToken()
      .then((result) => {
        this.allGood = result
        this.languageService.currentLanguage$.subscribe((language) => {
          this.currentLang = language
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
  }

  public chooseLanguage(event: MouseEvent): void {
    event.stopPropagation()
    this.currentLang = this.currentLang === 'en' ? 'ka' : 'en'
    this.languageService.setLanguage(this.currentLang)
    this.loadTopics()
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
