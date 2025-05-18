import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { IProduct } from '../../interfaces/product.interface'

@Component({
  selector: 'app-bundles',
  imports: [],
  templateUrl: './bundles.component.html',
  styleUrl: './bundles.component.scss',
})
export class BundlesComponent implements OnChanges {
  public bundleTotalPrice?: number
  public bundleTotalSalePrice?: number
  @Input() product?: IProduct
  @Input() currentLang: 'ka' | 'en' = 'en'

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue && this.product) {
      this.calculatePrices(this.product)
    }
  }

  public calculatePrices(product: IProduct): void {
    this.bundleTotalPrice =
      product.bundles.reduce((accumulator, product) => accumulator + product.productPrice, 0) + product.price

    this.bundleTotalSalePrice =
      product.bundles.reduce((accumulator, product) => accumulator + product.productSalePrice, 0) + product.price
  }
}
