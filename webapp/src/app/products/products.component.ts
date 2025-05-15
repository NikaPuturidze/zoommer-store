import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { IProductsResponse, ProductsOptions } from '../interfaces/products.interface'
import { CatalogComponent } from './catalog/catalog.component'
import { FilterComponent } from './filter/filter.component'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { startWith } from 'rxjs'

@Component({
  selector: 'app-products',
  imports: [CatalogComponent, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnChanges, OnInit {
  public productsOptions!: ProductsOptions
  public productsResponse?: IProductsResponse
  public isSortOpen = false
  public currentSort?: string
  public sortLabels = {
    en: ['Price: High to Low', 'Price: Low to High', 'Name: A-Z', 'Name: Z-A'],
    ka: ['ფასი: კლებადობით', 'ფასი: ზრდადობით', 'დასახელება: A-Z', 'დასახელება: Z-A'],
  }
  public sortFallback = { en: 'Sort', ka: 'სორტირება' }
  public currentLang: 'en' | 'ka' = 'en'
  public sort? = {}

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private router: Router,
    private actR: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.getSort()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productOptions'] && this.productsOptions) {
      this.onFiltersChanged(this.productsOptions)
    }
  }

  public onFiltersChanged(options: ProductsOptions): void {
    this.productsOptions = options
    this.loadProduct({
      ...options,
      ...this.sort,
    })
  }

  public toggleSort(): void {
    this.isSortOpen = !this.isSortOpen
  }

  public switchSort(option: string): void {
    const labels = this.sortLabels[this.currentLang]
    let query: Params

    if (option === labels[0]) query = { priceAsc: true, nameAsc: '' }
    else if (option === labels[1]) query = { priceAsc: false, nameAsc: '' }
    else if (option === labels[2]) query = { priceAsc: '', nameAsc: true }
    else query = { priceAsc: '', nameAsc: false }

    this.currentSort = option
    this.router
      .navigate([], {
        relativeTo: this.actR,
        queryParams: query,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        const { nameAsc, priceAsc } = query
        this.sort = {
          nameAsc: nameAsc as boolean,
          priceAsc: priceAsc as boolean,
        }
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }

  public getSort(): void {
    this.actR.queryParamMap.pipe(startWith(this.actR.snapshot.queryParamMap)).subscribe((queryParameters) => {
      const priceAscRaw = queryParameters.get('priceAsc')
      const nameAscRaw = queryParameters.get('nameAsc')
      const priceAsc = priceAscRaw === 'true' ? true : priceAscRaw === 'false' ? false : undefined
      const nameAsc = nameAscRaw === 'true' ? true : nameAscRaw === 'false' ? false : undefined

      const labels = this.sortLabels[this.currentLang]

      this.sort = {
        nameAsc,
        priceAsc,
      }

      if (priceAsc === true) this.currentSort = labels[0]
      else if (priceAsc === false) this.currentSort = labels[1]
      else if (nameAsc === true) this.currentSort = labels[2]
      else if (nameAsc === false) this.currentSort = labels[3]
      else this.currentSort = this.sortFallback[this.currentLang]
    })
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
