import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../services/api.service'
import { IPromotion } from '../../interfaces/promotion.interface'
import { ViewportService } from '../services/viewport.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
@UntilDestroy()
@Component({
  selector: 'app-promotion',
  imports: [TranslateModule],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss',
})
export class PromotionComponent implements OnInit {
  public promotion?: IPromotion
  public viewportWidth = 0

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private router: Router,
    private actR: ActivatedRoute,
    private viewport: ViewportService
  ) {}

  ngOnInit(): void {
    this.loadPromotion()
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.loadPromotion()
    })

    this.viewport.Viewport$.pipe(untilDestroyed(this)).subscribe((values) => {
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
