import { Component, Input } from '@angular/core'
import { IProduct } from '../../interfaces/content.interface'

@Component({
  selector: 'app-templ-product',
  imports: [],
  templateUrl: './templ-product.component.html',
  styleUrl: './templ-product.component.scss',
})
export class TemplProductComponent {
  @Input() product?: IProduct
  @Input() currentLang: 'en' | 'ka' = 'en'

  public roundPrice(price: number): number {
    return Math.floor(price)
  }
}
