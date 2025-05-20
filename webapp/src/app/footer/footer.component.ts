import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { LanguageService } from '../services/language.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnChanges {
  @Input() topics?: ITopicsResponse
  public currentLang: 'en' | 'ka' = 'en'
  public optionsArray: string[] = []

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topics']?.currentValue) {
      this.languageService.currentLanguage$.subscribe((language) => {
        this.currentLang = language
        this.updateLanguageState()
      })
    }
  }

  private updateLanguageState(): void {
    if (this.currentLang === 'ka') {
      this.optionsArray = ['ნავიგაცია', 'გადახდები', 'გამოგვყევი', 'კონტაქტი', 'ფილიალები', 'კორპორატიული გაყიდვები']
    } else {
      this.optionsArray = ['Navigation', 'Payments', 'Follow Us', 'Contact', 'Branches', 'Corporate Sales']
    }
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
