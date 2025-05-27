import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { IAllCategory } from '../../interfaces/all-categories.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-all-categories',
  imports: [],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
})
export class AllCategoriesComponent implements OnInit {
  public currentLang: 'ka' | 'en' = 'en'
  public allCategories?: IAllCategory[]

  constructor(
    private apiService: ApiService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.loadAllCategories()
    })
  }

  private loadAllCategories(): void {
    this.apiService.allCategories().subscribe({
      next: (data: IAllCategory[]) => {
        this.allCategories = data
      },
    })
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
