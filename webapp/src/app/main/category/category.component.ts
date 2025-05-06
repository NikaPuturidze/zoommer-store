import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { LanguageService } from '../../services/language.service'
import { IMegaMenuResponse } from '../../interfaces/mega-menu.interface'

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  public megaMenu?: IMegaMenuResponse
  public currentLang: 'en' | 'ka' = 'en'

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.loadMegaMenu()
    })
  }

  private loadMegaMenu(): void {
    this.apiService.megaMenu(this.currentLang).subscribe({
      next: (data: IMegaMenuResponse) => {
        this.megaMenu = data
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load mega-menu', error)
      },
    })
  }
}
