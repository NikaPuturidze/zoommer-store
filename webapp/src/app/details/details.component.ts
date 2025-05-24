import { Component } from '@angular/core'
import { OverviewComponent } from './overview/overview.component'
import { AdditionalInfoComponent } from './additional-info/additional-info.component'
import { BuyComponent } from './buy/buy.component'
import { BundlesComponent } from './bundles/bundles.component'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { IProduct, IProductResponse } from '../interfaces/product.interface'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { DiscountComponent } from './discount/discount.component'
import { ViewportService } from '../services/viewport.service'

@Component({
  selector: 'app-details',
  imports: [
    OverviewComponent,
    AdditionalInfoComponent,
    BuyComponent,
    BundlesComponent,
    ContentLoaderModule,
    DiscountComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  public productResponse?: IProductResponse
  public product?: IProduct
  public currentLang: 'ka' | 'en' = 'en'
  public viewportWidth

  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private languageService: LanguageService,
    private actR: ActivatedRoute,
    private viewport: ViewportService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.productResponse = undefined
      this.product = undefined
      this.currentLang = language
      this.actR.params.subscribe((parameters) => {
        this.loadDetails(this.getProductId(parameters))
      })
    })

    this.viewport.Viewport$.subscribe((value) => {
      this.viewportWidth = value.width
    })
  }

  private loadDetails(productId: number): void {
    this.apiService.details(this.currentLang, productId).subscribe({
      next: (data: IProductResponse) => {
        if (data.httpStatusCode !== 200) {
          this.router.navigate(['/page/not-found/404/']).catch((error: unknown) => {
            console.error(error)
          })
          return
        }
        this.productResponse = data
        this.product = data.product
        data.product.specificationGroup.forEach((specification) => {
          specification.isActive = true
        })
        data.product.currentImage = 0
        data.product.translateX = 0
      },
      error: (error: ErrorOptions) => {
        console.error(error)
      },
    })
  }

  private getProductId(parameters: Params): number {
    const url = parameters['product'] as string
    const lastSegment = url.slice(url.lastIndexOf('-') + 1)
    return Number(
      Array.from(lastSegment)
        .filter((char) => char >= '0' && char <= '9')
        .join('')
    )
  }
}
