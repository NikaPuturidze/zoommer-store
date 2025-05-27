import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LanguageService } from '../services/language.service'
import { ITopicsResponse } from '../../interfaces/topics.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() topics?: ITopicsResponse
  public currentLang: 'en' | 'ka' = 'en'
  public currentFlag = ''
  public currentBranch = ''
  public currentLanguage = ''
  public isLanguageMenuOpen = false

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.updateLanguageState()
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
    this.isLanguageMenuOpen = false
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }

  private updateLanguageState(): void {
    this.currentFlag = `https://zoommer.ge/icons/footer/${this.currentLang === 'en' ? 'en.svg' : 'flag-geo.png'}`
    this.currentBranch = this.currentLang === 'en' ? 'Branches' : 'ფილიალები'
    this.currentLanguage = this.currentLang === 'en' ? 'GEO' : 'ENG'
  }
}
