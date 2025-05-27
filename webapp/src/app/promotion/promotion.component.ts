import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { IPromotion } from '../interfaces/promotion.interface'
import { ViewportService } from '../services/viewport.service'

@Component({
  selector: 'app-promotion',
  imports: [],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss',
})
export class PromotionComponent implements OnInit {
  public currentLang: 'ka' | 'en' = 'en'
  public promotion?: IPromotion
  public viewportWidth

  constructor(
    private apiService: ApiService,
    private languageService: LanguageService,
    private router: Router,
    private actR: ActivatedRoute,
    private viewport: ViewportService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.loadPromotion()
    })

    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })
  }

  private loadPromotion(): void {
    this.apiService.promotion().subscribe({
      next: (data: IPromotion) => {
        this.promotion = data
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public navigateTo(route: string[]): void {
    this.router
      .navigate(route, {
        relativeTo: this.actR,
        replaceUrl: false,
        queryParamsHandling: 'merge',
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }
}
