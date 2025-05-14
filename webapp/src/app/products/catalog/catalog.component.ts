import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { IProductsResponse } from '../../interfaces/products.interface'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, TemplProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  @Input() productsResponse?: IProductsResponse
  @Input() public currentLang?: string
  public lang: 'ka' | 'en' = 'en'

  ngOnInit(): void {
    this.lang = this.currentLang as 'ka' | 'en'
  }
}
