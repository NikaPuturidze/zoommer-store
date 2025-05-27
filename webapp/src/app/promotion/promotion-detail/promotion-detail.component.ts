import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { LanguageService } from '../../services/language.service'
import { IPromotionDetailsResponse } from '../../interfaces/promotion-details.interface'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-promotion-detail',
  imports: [TemplProductComponent],
  templateUrl: './promotion-detail.component.html',
  styleUrl: './promotion-detail.component.scss',
})
export class PromotionDetailComponent implements OnInit, AfterViewChecked {
  public currentLang: 'ka' | 'en' = 'en'
  public promotionDetail?: IPromotionDetailsResponse
  public categoryIds: number[] = []
  public justifyContent: 'center' | 'flex-start' = 'flex-start'
  public showLoader?: boolean
  private page = 1
  private promotionId?: number

  @ViewChild('product') productEl!: ElementRef<HTMLElement>

  constructor(
    private apiService: ApiService,
    private actR: ActivatedRoute,
    private languageService: LanguageService,
    private cd: ChangeDetectorRef,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.getPromotionId()
    })
  }

  ngAfterViewChecked(): void {
    if (this.productEl) {
      const height = this.productEl.nativeElement.offsetHeight
      const newJustify = height > 30 ? 'center' : 'flex-start'
      if (newJustify !== this.justifyContent) {
        this.justifyContent = newJustify
        this.cd.detectChanges()
      }
    }
  }

  private getPromotionId(): void {
    this.actR.paramMap.subscribe((parameterMap) => {
      this.promotionId = Number(parameterMap.get('detail')?.split('-').at(-1))
      this.loadPromotionDetail(this.currentLang, this.page, 48, this.promotionId)
      this.title.setTitle(
        this.currentLang === 'ka' ? 'ზუმერული შეთავაზებები | Zoommer.ge' : 'Zoommers Offers | Zoommer.ge'
      )
    })
  }

  private loadPromotionDetail(
    lang: string,
    page: number,
    limit: number,
    promotionId: number,
    categoryIds?: number[]
  ): void {
    this.showLoader = true
    this.apiService.promotionDetail(lang, page, limit, promotionId, categoryIds).subscribe({
      next: (data) => {
        if (this.promotionDetail && page > 1) {
          this.promotionDetail.items = [...this.promotionDetail.items, ...data.items]
          this.promotionDetail.categories = data.categories
          this.promotionDetail.item = data.item
        } else {
          this.promotionDetail = data
        }
        this.showLoader = false
      },
      error: (error: unknown) => {
        console.error(error)
        this.showLoader = false
      },
    })
  }

  public toggleCategoryId(id: number): void {
    if (this.promotionId) {
      if (this.categoryIds.includes(id)) {
        this.categoryIds.splice(this.categoryIds.indexOf(id), 1)
      } else {
        this.categoryIds.push(id)
      }

      this.page = 1
      this.loadPromotionDetail(this.currentLang, this.page, 48, this.promotionId, this.categoryIds)
    }
  }

  public nextPage(): void {
    if (this.promotionId) {
      this.page++
      this.loadPromotionDetail(this.currentLang, this.page, 48, this.promotionId)
    }
  }
}
