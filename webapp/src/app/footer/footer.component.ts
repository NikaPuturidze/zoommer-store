import { Component, Input, OnChanges } from '@angular/core'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { LanguageService } from '../services/language.service'

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

  constructor(private languageService: LanguageService) {}

  ngOnChanges(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.updateLanguageState()
    })
  }

  private updateLanguageState(): void {
    if (this.currentLang === 'ka') {
      this.optionsArray = ['ნავიგაცია', 'გადახდები', 'გამოგვყევი', 'კონტაქტი', 'ფილიალები', 'კორპორატიული გაყიდვები']
    } else {
      this.optionsArray = ['Navigation', 'Payments', 'Follow Us', 'Contact', 'Branches', 'Corporate Sales']
    }
  }
}
