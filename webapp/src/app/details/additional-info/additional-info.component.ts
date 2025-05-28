import { Component, Input } from '@angular/core'
import { AccesoriesComponent } from './accesories/accesories.component'
import { SimmilarComponent } from './simmilar/similar.component'
import { FeaturesComponent } from './features/features.component'
import { WarrantyComponent } from './warranty/warranty.component'
import { BranchesComponent } from './branches/branches.component'
import { IProduct, IProductResponse } from '../../../interfaces/product.interface'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-additional-info',
  imports: [
    AccesoriesComponent,
    SimmilarComponent,
    FeaturesComponent,
    WarrantyComponent,
    BranchesComponent,
    ContentLoaderModule,
    TranslateModule,
  ],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss',
})
export class AdditionalInfoComponent {
  @Input() product?: IProduct
  @Input() productResponse?: IProductResponse
}
