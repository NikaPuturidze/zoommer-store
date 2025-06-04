import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EProducts, IProductsResponse } from '../../../interfaces/products.interface'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { LocalStorageService } from '../../services/localstorage.service'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, TemplProductComponent, ContentLoaderModule, TranslateModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  @Output() pageSet = new EventEmitter<number>()
  @Input() productsResponse?: IProductsResponse
  @Input() isLoading?: boolean
  @Input() isMore?: boolean
  @Input() showLoader?: boolean
  @Input() page? = 1
  public showGrid?: string
  public skeletonArray: number[] = Array(28) as number[]

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })
  }

  nextPage(): void {
    if (this.page) {
      const next = this.page + 1
      this.page = next
      this.pageSet.emit(next)

      if (this.productsResponse) {
        this.isMore =
          this.productsResponse.products.length + EProducts.PRODUCT_PER_PAGE < this.productsResponse.productsCount
      }
    }
  }
}
