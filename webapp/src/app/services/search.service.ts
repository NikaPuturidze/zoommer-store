import { Injectable } from '@angular/core'
import { BehaviorSubject, debounceTime } from 'rxjs'
import { ApiService } from './api.service'
import { IPopularSearchesResponse } from 'webapp/src/interfaces/popular-searches.interface'
import { IProductsResponse } from 'webapp/src/interfaces/products.interface'
import { FormControl, FormGroup } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public isSearching$ = new BehaviorSubject<boolean>(false)
  public searchResponse = new BehaviorSubject<IPopularSearchesResponse | null>(null)
  public productsResponse = new BehaviorSubject<IProductsResponse | null>(null)
  public isFetching = new BehaviorSubject<boolean>(false)
  public searchFormValue = new BehaviorSubject<string | null>(null)
  public categoryToggled = new BehaviorSubject<boolean>(false)
  public categoryIds: number[] = []
  public search = new FormGroup({
    search: new FormControl<string | null>(null),
  })
  public page = 1
  public limit = 20
  public notFound = false

  constructor(
    private apiService: ApiService,
    private cookie: CookieService
  ) {
    this.categoryToggled.pipe(debounceTime(350)).subscribe((value) => {
      if (value && this.searchFormValue.value) {
        this.page = 1
        this.searchProducts(this.searchFormValue.value, this.limit)
      }
    })

    this.search.get('search')?.valueChanges.subscribe((value) => {
      if (value === null || value == '' || value.length <= 3) {
        this.page = 1
        this.categoryIds = []
        this.searchFormValue.next(null)
        this.productsResponse.next(null)
      }
    })
  }

  public startSearch(): void {
    if (!this.searchResponse.value) {
      this.loadPopularSearches()
    }
    this.isSearching$.next(true)
  }

  public endSearch(): void {
    this.isSearching$.next(false)
  }

  public setValue(value: string): void {
    this.page = 1
    this.searchFormValue.next(value)
    this.searchProducts(value, this.limit)
    this.handleCookies(value)
  }

  public handleCookies(value: string): void {
    const raw = this.cookie.get('last-searched') || '[]'
    const array: string[] = JSON.parse(raw) as string[]
    if (array.includes(value)) return

    array.push(value)
    this.cookie.set('last-searched', JSON.stringify(array), 365)
  }

  public removeLastSearched(item: string): void {
    const raw = this.cookie.get('last-searched') || '[]'
    let array: string[] = JSON.parse(raw) as string[]

    array = array.filter((element) => element !== item)

    this.cookie.set('last-searched', JSON.stringify(array), 365)
  }

  public toggleCategory(): void {
    this.categoryToggled.next(true)
  }

  public loadMore(): void {
    if (this.searchFormValue.value) {
      this.page++
      this.searchProducts(this.searchFormValue.value, this.limit)
    }
  }

  private loadPopularSearches(): void {
    this.apiService.popularSearches().subscribe({
      next: (data: IPopularSearchesResponse) => {
        this.searchResponse.next(data)
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public searchProducts(name: string, limit: number): void {
    this.isFetching.next(true)
    this.apiService
      .products({
        page: this.page,
        limit,
        name,
        notInStock: true,
        ...(this.categoryIds.length !== 0 ? { categories: this.categoryIds } : {}),
      })
      .subscribe({
        next: (data: IProductsResponse) => {
          let nextPayload: IProductsResponse

          if (this.page === 1) {
            nextPayload = data
          } else {
            nextPayload = {
              ...data,
              products: [...(this.productsResponse.value?.products ?? []), ...data.products],
            }
          }

          if (nextPayload.products.length < 1) {
            this.notFound = true
          } else {
            this.notFound = false
          }

          this.productsResponse.next(nextPayload)
          this.isFetching.next(false)
        },
        error: (error: unknown) => {
          console.error(error)
          this.isFetching.next(false)
        },
      })
  }
}
