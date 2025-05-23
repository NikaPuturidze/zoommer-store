import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { IProduct, ITranslations } from '../../interfaces/product.interface'

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
  @Input() translations?: ITranslations

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue && this.product) {
      this.calculatePrices(this.product)
    }
  }

  public calculatePrices(product: IProduct): void {
    this.bundleTotalPrice =
      product.bundles.reduce((sum, item) => sum + (item.productPrice ?? item.productSalePrice), 0) + product.price

    this.bundleTotalSalePrice =
      product.bundles.reduce((accumulator, product) => accumulator + product.productSalePrice, 0) + product.price
  }
}
