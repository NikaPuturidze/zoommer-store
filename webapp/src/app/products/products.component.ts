import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { ActivatedRoute } from '@angular/router'
import { IProductsResponse, ProductsOptions } from '../interfaces/products.interface'
import { TemplProductComponent } from '../templates/templ-product/templ-product.component'
import { LanguageService } from '../services/language.service'
import { combineLatest, Subject, takeUntil } from 'rxjs'
import { IProduct } from '../interfaces/content.interface'

@Component({
  selector: 'app-products',
  imports: [TemplProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  public productsResponse?: IProductsResponse
  public products?: IProduct[]
  public currentLanguage: 'en' | 'ka' = 'en'
  private page = 1
  private limit = 28
  private destroy$ = new Subject<void>()

  constructor(
    private readonly apiService: ApiService,
    private langaugeService: LanguageService,
    private actR: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.langaugeService.currentLanguage$, this.actR.params])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([language, parameters]) => {
        this.currentLanguage = language
        const productsUrl = parameters['products'] as string
        if (productsUrl) {
          this.loadProduct({
            lang: this.currentLanguage,
            page: this.page,
            limit: this.limit,
            ...(productsUrl.at(-1) === 's'
              ? { categories: Number(this.getCategoryId(productsUrl)) }
              : { categoryId: Number(this.getCategoryId(productsUrl)) }),
          })
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadProduct(options: ProductsOptions): void {
    this.apiService.products(options).subscribe({
      next: (data: IProductsResponse) => {
        this.productsResponse = data
        this.products = data.products
      },
      error: (error: ErrorOptions) => {
        console.error(error)
      },
    })
  }

  private getCategoryId(productsUrl: string): string {
    const lastSegment = productsUrl.slice(productsUrl.lastIndexOf('-') + 1)
    return Array.from(lastSegment)
      .filter((char) => char >= '0' && char <= '9')
      .join('')
  }
}
