import { Component, OnChanges, SimpleChanges } from '@angular/core'
import { IProductsResponse, ProductsOptions } from '../interfaces/products.interface'
import { CatalogComponent } from './catalog/catalog.component'
import { FilterComponent } from './filter/filter.component'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-products',
  imports: [CatalogComponent, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnChanges {
  public productsOptions!: ProductsOptions
  public productsResponse?: IProductsResponse

  constructor(private readonly apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productOptions'] && this.productsOptions) {
      this.onFiltersChanged(this.productsOptions)
    }
  }

  public onFiltersChanged(options: ProductsOptions): void {
    this.productsOptions = options
    this.loadProduct(options)
  }

  private loadProduct(options: ProductsOptions): void {
    this.apiService.products(options).subscribe({
      next: (data) => {
        this.productsResponse = data
      },
      error: (error) => {
        console.error(error)
      },
    })
  }
}
