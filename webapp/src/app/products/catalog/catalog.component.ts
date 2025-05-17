import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { IProductsResponse } from '../../interfaces/products.interface'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { LocalStorageService } from '../../services/localstorage.service'
import { ContentLoaderModule } from '@ngneat/content-loader'

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, TemplProductComponent, ContentLoaderModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  @Input() productsResponse?: IProductsResponse
  @Input() public currentLang?: 'ka' | 'en' = 'en'
  @Input() isLoading?: boolean
  public showGrid?: string
  public skeletonArray: number[] = Array(36) as number[]

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })
  }
}
