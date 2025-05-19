import { Component, Input } from '@angular/core'
import { IProduct, ITranslations } from '../../interfaces/product.interface'

@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  @Input() product?: IProduct
  @Input() translations?: ITranslations
}
