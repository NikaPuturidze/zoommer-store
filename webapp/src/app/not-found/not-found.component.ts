import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LanguageService } from '../services/language.service'

@Component({
  selector: 'app-not-found',
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent implements OnInit {
  public currentLang: 'ka' | 'en' = 'en'

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
    })
  }
}
