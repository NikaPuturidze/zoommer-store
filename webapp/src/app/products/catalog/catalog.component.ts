import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { IProductsResponse } from '../../interfaces/products.interface'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { LocalStorageService } from '../../services/localstorage.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, TemplProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  @Input() productsResponse?: IProductsResponse
  @Input() public currentLang?: 'ka' | 'en' = 'en'
  public showGrid?: string

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
