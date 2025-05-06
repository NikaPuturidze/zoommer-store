import { Component, OnInit } from '@angular/core'
import { CategoryComponent } from './category/category.component'
import { ImageCarouselComponent } from './image-carousel/image-carousel.component'
import { IContentResponse } from '../interfaces/content.interface'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, ImageCarouselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  public content?: IContentResponse
  public currentLang: 'en' | 'ka' = 'en'

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.loadContent()
    })
  }

  private loadContent(): void {
    this.apiService.content(this.currentLang).subscribe({
      next: (data: IContentResponse) => {
        this.content = data
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load content', error)
      },
    })
  }
}
