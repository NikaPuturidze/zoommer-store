import { Component, OnInit } from '@angular/core'
import { TemplProductComponent } from '../templates/templ-product/templ-product.component'
import { TranslateModule } from '@ngx-translate/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { PulseLoaderComponent } from '../ui/loaders/pulse-loader/pulse-loader.component'
import { ApiService } from '../services/api.service'
import { IProduct, IProductsResponse } from 'webapp/src/interfaces/products.interface'
import { ViewportService } from '../services/viewport.service'
import { AsyncPipe } from '@angular/common'
import { SearchService } from '../services/search.service'
import { CookieService } from 'ngx-cookie-service'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { ReactiveFormsModule } from '@angular/forms'
import { UniqueArrayPipe } from '../services/pipes/unique-array.pipe'

@Component({
  selector: 'app-search',
  imports: [
    TemplProductComponent,
    TranslateModule,
    ContentLoaderModule,
    PulseLoaderComponent,
    AsyncPipe,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    UniqueArrayPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public products?: IProduct[]
  public productsResponse?: IProductsResponse
  public keyword = ''
  public page = 1
  public limit = 30
  public skeletonArray = Array(this.limit)
  public categoryIds: number[] = []
  public loading = false
  public lastSearched: string[] = []
  public viewportWidth = 0
  public isOut = false

  constructor(
    private apiService: ApiService,
    private cookie: CookieService,
    private router: Router,
    private actR: ActivatedRoute,
    public viewport: ViewportService,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.actR.paramMap.subscribe((values) => {
      this.keyword = ''
      this.productsResponse = undefined
      this.products = undefined
      if (values.has('keyword')) {
        this.keyword = String(values.get('keyword'))
        this.loadProducts(this.keyword)
      }

      this.actR.params.subscribe((values) => {
        this.isOut = Object.keys(values).length !== 0
      })

      const pathParts = this.router.url.split('/')
      if (pathParts[0] === '' && pathParts[1] === 'search' && pathParts.length === 2) {
        this.searchService.startSearch()
      }
    })

    this.searchService.search.valueChanges.pipe(debounceTime(350), distinctUntilChanged()).subscribe((keyword) => {
      if (this.viewportWidth <= 1024) {
        if (keyword.search && keyword.search.length >= 3) {
          this.searchService.setValue(keyword.search)
        }
      }
    })

    this.searchService.isSearching$.subscribe(() => {
      this.getLastSearched()
    })

    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })

    this.getLastSearched()
  }

  public getLastSearched(): void {
    if (this.cookie.check('last-searched')) {
      this.lastSearched = JSON.parse(this.cookie.get('last-searched')) as string[]
    }
  }

  public removeSearched(): void {
    this.cookie.delete('last-searched', '/search')
    this.lastSearched = []
  }

  public loadMore(): void {
    this.page++
    this.loadProducts(this.keyword)
  }

  public toggleCategoryId(id: number): void {
    if (this.searchService.categoryIds.includes(id)) {
      this.searchService.categoryIds.splice(this.searchService.categoryIds.indexOf(id), 1)
    } else {
      this.searchService.categoryIds.push(id)
    }
    this.searchService.toggleCategory()
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
    this.searchService.endSearch()
  }

  public navigateToMain(): void {
    this.router.navigate(['/'], { replaceUrl: true }).catch((error: unknown) => {
      console.error(error)
    })
    this.searchService.endSearch()
  }

  private loadProducts(keyword: string): void {
    this.loading = true
    this.apiService
      .products({
        page: this.page,
        limit: this.limit,
        name: keyword,
        notInStock: true,
        ...(this.categoryIds.length !== 0 ? { categories: this.categoryIds } : {}),
      })
      .subscribe({
        next: (data: IProductsResponse) => {
          this.productsResponse = data

          if (this.products) {
            this.products = this.products.concat(data.products)
          } else {
            this.products = data.products
          }

          this.loading = false
        },
        error: (error: unknown) => {
          console.error(error)
          this.loading = false
        },
      })
  }
}
