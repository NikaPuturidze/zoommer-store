import { Component, Input } from '@angular/core'
import { IProduct, ITranslations } from '../../interfaces/product.interface'

@Component({
  selector: 'app-buy',
  imports: [],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
})
export class BuyComponent {
  @Input() translations?: ITranslations
  @Input() product?: IProduct
}
