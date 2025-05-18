import { Component, Input } from '@angular/core'
import { IProduct, ITranslations } from '../../interfaces/product.interface'
import { ContentLoaderModule } from '@ngneat/content-loader'

@Component({
  selector: 'app-buy',
  imports: [ContentLoaderModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
})
export class BuyComponent {
  @Input() translations?: ITranslations
  @Input() product?: IProduct
}
