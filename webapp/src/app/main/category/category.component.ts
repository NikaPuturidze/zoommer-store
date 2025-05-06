import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { LanguageService } from '../../services/language.service'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  public megaMenu?: IMegaMenu[]
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
      next: (data: IMegaMenu[]) => {
        this.megaMenu = data
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load mega-menu', error)
      },
    })
  }
}
