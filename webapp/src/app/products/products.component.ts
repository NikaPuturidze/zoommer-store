import { Component, Input, OnInit } from '@angular/core'
import { EProducts, IProductsResponse, ProductsOptions } from '../interfaces/products.interface'
import { CatalogComponent } from './catalog/catalog.component'
import { FilterComponent } from './filter/filter.component'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'
import { startWith } from 'rxjs'
import { LocalStorageService } from '../services/localstorage.service'
import { ContentLoaderModule } from '@ngneat/content-loader'

@Component({
  selector: 'app-products',
  imports: [CatalogComponent, FilterComponent, ContentLoaderModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public productsOptions!: ProductsOptions
  public productsResponse?: IProductsResponse
  public isSortOpen = false
  public currentSort?: string
  public filter?: string
  public sortLabels = {
    en: ['Price: High to Low', 'Price: Low to High', 'Name: A-Z', 'Name: Z-A'],
    ka: ['ფასი: კლებადობით', 'ფასი: ზრდადობით', 'დასახელება: A-Z', 'დასახელება: Z-A'],
  }
  public sortFallback = { en: 'Sort', ka: 'სორტირება' }
  public currentLang: 'en' | 'ka' = 'en'
  public sort? = {}
  public showGrid?: string
  public isLoading = false
  public isMore?: boolean
  public showLoader?: boolean = false
  public page?: number
  @Input() filterOpen = false

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private router: Router,
    private actR: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.productsResponse = undefined
      this.getSort()
      this.filter = language === 'en' ? 'filter' : 'ფილტრი'
    })

    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })

    if (this.showGrid !== 'true' && this.showGrid !== 'false') {
      this.localStorageService.set('showGrid', 'false')
    }

    if (this.productsOptions) {
      this.onFiltersChanged(this.productsOptions)
    }
  }

  public openFilters(): void {
    this.filterOpen = true
  }

  public onPageSet(nextPage: number): void {
    this.showLoader = true
    this.page = nextPage
    this.loadProduct({ ...this.productsOptions, ...this.sort, page: nextPage, lang: this.currentLang }, () => {
      this.showLoader = false
    })
  }

  public onFiltersChanged(options: ProductsOptions): void {
    this.productsOptions = options
    this.isLoading = true
    this.productsResponse = undefined
    this.page = 1
    this.isMore = false
    this.loadProduct({
      ...this.productsOptions,
      ...this.sort,
      page: 1,
      lang: this.currentLang,
    })
  }

  public toggleSort(): void {
    this.isSortOpen = !this.isSortOpen
  }

  public setGrid(): void {
    this.localStorageService.set('showGrid', 'true')
    this.showGrid = this.localStorageService.get('showGrid') as string | undefined
  }

  public setLine(): void {
    this.localStorageService.set('showGrid', 'false')
    this.showGrid = this.localStorageService.get('showGrid') as string | undefined
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
        replaceUrl: true,
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

  private loadProduct(options: ProductsOptions, callback?: () => void): void {
    this.apiService.products(options).subscribe({
      next: (data: IProductsResponse) => {
        this.isMore = data.productsCount > options.page * EProducts.PRODUCT_PER_PAGE
        this.page = options.page

        if (options.page === 1) {
          this.productsResponse = data
        } else {
          this.productsResponse = {
            ...data,
            products: [...(this.productsResponse?.products ?? []), ...data.products],
          }
        }

        this.isLoading = false
        if (callback) callback()
      },
      error: (error: unknown) => {
        console.error(error)
        this.isLoading = false
      },
    })
  }
}
