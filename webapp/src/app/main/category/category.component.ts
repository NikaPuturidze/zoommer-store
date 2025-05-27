import { Component, Input, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { LanguageService } from '../../services/language.service'
import { IMegaMenu } from '../../../interfaces/mega-menu.interface'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { BurgerService } from '../../services/burger.service'
import { ViewportService } from '../../services/viewport.service'

@Component({
  selector: 'app-category',
  imports: [CommonModule, ContentLoaderModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  public megaMenu: IMegaMenu[] | undefined
  public currentLang: 'en' | 'ka' = 'en'
  public isInCategory = false
  public currentCategory = -1
  public viewportWidth
  @Input() width = 0

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private router: Router,
    private burgerService: BurgerService,
    private viewport: ViewportService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.burgerService.getMegaMenu().subscribe({
        next: (data: IMegaMenu[] | undefined) => {
          this.megaMenu = data
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
    })

    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })
  }

  public getHeight(index: number): string {
    const heightBefore = ['555.5px', '409px', '580px', '745.5px', '483px', '483px', '378px', '378px']
    const heightAfter = ['650px', '600px', '675px', '850px', '575px', '537px', '500px', '455px']
    return this.viewportWidth > 1200 ? heightBefore[index] : heightAfter[index]
  }

  public getCurrentCategory(index: number): void {
    this.currentCategory = index
    this.isInCategory = true
  }

  public resetCurrentCategory(): void {
    this.currentCategory = -1
    this.isInCategory = false
  }

  public formatUrl(url: string): string {
    return url?.split('https://zoommer.ge/')[1]
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
