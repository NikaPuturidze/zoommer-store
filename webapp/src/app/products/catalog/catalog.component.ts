import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { IProductsResponse } from '../../interfaces/products.interface'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { LocalStorageService } from '../../services/localstorage.service'

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
  public showGrid?: string

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.lang = this.currentLang as 'ka' | 'en'
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })
  }
}
