import { Component, Input } from '@angular/core'
import { IProduct } from '../../../interfaces/product.interface'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-buy',
  imports: [ContentLoaderModule, TranslateModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
})
export class BuyComponent {
  @Input() product?: IProduct

  constructor(public translateService: TranslateService) {}
}
