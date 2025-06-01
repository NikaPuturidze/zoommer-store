import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { OverviewComponent } from './overview/overview.component'
import { AdditionalInfoComponent } from './additional-info/additional-info.component'
import { BuyComponent } from './buy/buy.component'
import { BundlesComponent } from './bundles/bundles.component'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { IProduct, IProductResponse } from '../../interfaces/product.interface'
import { ApiService } from '../services/api.service'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { DiscountComponent } from './discount/discount.component'
import { ViewportService } from '../services/viewport.service'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  public productResponse?: IProductResponse
  public product?: IProduct
  public viewportWidth = 0

  constructor(
    private apiService: ApiService,
    private router: Router,
    private translateService: TranslateService,
    private actR: ActivatedRoute,
    private viewport: ViewportService,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.actR.params.subscribe((parameters) => {
      this.loadDetails(this.getProductId(parameters))
    })

    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.productResponse = undefined
      this.product = undefined
      this.loadDetails(this.getProductId(this.actR.snapshot.params))
    })

    this.viewport.Viewport$.subscribe((value) => {
      this.viewportWidth = value.width
    })

    this.cdr.detectChanges()
  }

  private loadDetails(productId: number): void {
    this.apiService.details(productId).subscribe({
      next: (data: IProductResponse) => {
        if (data.httpStatusCode !== 200) {
          this.router.navigate(['/not-found'], { replaceUrl: true }).catch((error: unknown) => {
            console.error(error)
          })
          return
        }
        this.title.setTitle(data.product.metaTitle)
        this.productResponse = data
        this.product = data.product
        data.product.specificationGroup.forEach((specification) => {
          specification.isActive = true
        })
        data.product.currentImage = 0
        data.product.translateX = 0
        this.cdr.detectChanges()
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
