import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { CommonModule } from '@angular/common'
import { LanguageService } from '../services/language-service.service'

@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public topics?: ITopicsResponse
  public currentLang: 'en' | 'ka' = 'en'
  public currentFlag = ''
  public currentBranch = ''
  public currentLanguage = ''
  public isLanguageMenuOpen = false

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.updateLanguageState()
      this.loadTopics()
    })
  }

  public toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen
  }

  public chooseLanguage(event: MouseEvent): void {
    event.stopPropagation()
    this.currentLang = this.currentLang === 'en' ? 'ka' : 'en'
    this.languageService.setLanguage(this.currentLang)
    this.updateLanguageState()
    this.loadTopics()
    this.isLanguageMenuOpen = false
  }

  private updateLanguageState(): void {
    this.currentFlag = `https://zoommer.ge/icons/footer/${this.currentLang === 'en' ? 'en.svg' : 'flag-geo.png'}`
    this.currentBranch = this.currentLang === 'en' ? 'branches' : 'ფილიალები'
    this.currentLanguage = this.currentLang === 'en' ? 'GEO' : 'ENG'
  }

  private loadTopics(): void {
    this.apiService.topics(this.currentLang).subscribe({
      next: (data: ITopicsResponse) => {
        this.topics = data
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load topics', error)
      },
    })
  }
}
