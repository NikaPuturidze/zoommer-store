import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { IAllCategory } from '../../interfaces/all-categories.interface'
import { Router } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
@UntilDestroy()
@Component({
  selector: 'app-all-categories',
  imports: [TranslateModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
})
export class AllCategoriesComponent implements OnInit {
  public allCategories?: IAllCategory[]

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllCategories()
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.allCategories = undefined
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
