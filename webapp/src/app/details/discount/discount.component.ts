import { Component, Input } from '@angular/core'
import { IProduct } from '../../../interfaces/product.interface'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-discount',
  imports: [TranslateModule],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  @Input() product?: IProduct
}
