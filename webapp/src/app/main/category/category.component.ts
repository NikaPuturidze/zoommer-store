import { Component, Input, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { LanguageService } from '../../services/language.service'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  public megaMenu?: (IMegaMenu | undefined)[]
  public currentLang: 'en' | 'ka' = 'en'
  public isInCategory = false
  public currentCategory = -1
  @Input() width = 0

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

  public getHeightBefore(index: number): string {
    const heightBefore = ['555.5px', '409.5px', '580px', '745.5px', '483px', '483px', '378px', '378px']
    return heightBefore[index]
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
}
