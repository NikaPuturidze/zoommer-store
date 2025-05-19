import { Component, Input } from '@angular/core'
import { IProduct } from '../../interfaces/product.interface'

@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  @Input() product?: IProduct
}
