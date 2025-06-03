import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { EFilter, IFilterResponse, ISpecification } from '../../../interfaces/filter.interface'
import { debounceTime, delay, distinctUntilChanged, filter, switchMap } from 'rxjs'
import { ICategoryInfo, ProductsOptions } from '../../../interfaces/products.interface'
import { ApiService } from '../../services/api.service'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { ViewportService } from '../../services/viewport.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
@UntilDestroy()
@Component({
  selector: 'app-filter',
  imports: [CommonModule, NgxSliderModule, FormsModule, ContentLoaderModule, TranslateModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Output() readonly FiltersChanged = new EventEmitter<ProductsOptions>()
  @Input() filterOpen?: boolean
  public specifications?: ISpecification[]
  public filterResponse?: IFilterResponse
  public minValue!: number
  public maxValue!: number
  public options!: Options
  public showPrice = true
  private queries: Record<string, string[]> = {}
  private page = 1
  private limit = 28
  private catInfo?: ICategoryInfo
  private productOptions!: ProductsOptions

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private actR: ActivatedRoute,
    private router: Router,
    private viewport: ViewportService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostBinding('class.mobile') isMobile = false

  ngAfterViewInit(): void {
    this.handleInputs()
  }

  ngOnInit(): void {
    this.viewport.Viewport$.subscribe((values) => {
      this.isMobile = values.width < 1024
    })

    this.translateService.onLangChange
      .pipe(
        filter(() => !!this.catInfo),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.filterResponse = undefined
        this.specifications = undefined

        if (this.catInfo) {
          this.loadFilters(this.catInfo.catId, (specs) => {
            const queryParameters = this.actR.snapshot.queryParams

            const filteredSpecifications = specs
              .filter((spec) => !!this.queries && Object.keys(this.queries).includes(spec.nameUrlFriendly))
              .map((spec) => ({
                ...spec,
                values: spec.values?.filter((item) =>
                  this.queries[spec.nameUrlFriendly].includes(item.valueUrlFriendly)
                ),
              }))

            const specificationIds = filteredSpecifications
              .map((spec) => (spec.values ?? []).map((item) => item.id).join(','))
              .join('_')

            if (this.catInfo) {
              this.productOptions = {
                page: this.page,
                limit: this.limit,
                ...(this.catInfo.isSuper ? { categories: [this.catInfo.catId] } : { categoryId: this.catInfo.catId }),
                ...(specificationIds ? { specificationIds: specificationIds } : {}),
                ...(queryParameters['priceFrom'] ? { priceFrom: queryParameters['priceFrom'] as number } : {}),
                ...(queryParameters['priceTo'] ? { priceTo: queryParameters['priceTo'] as number } : {}),
              }
            }

            this.FiltersChanged.emit(this.productOptions)
          })
        }
      })

    this.actR.params.subscribe((parameters) => {
      this.determineProduct(parameters, (categoryInfo) => {
        const queries = this.actR.snapshot.queryParams
        this.setSliderOptions(0, (queries['PriceTo'] as number) ?? 9999, (queries['PriceTo'] as number) ?? 9999)
        this.loadFilters(categoryInfo.catId, (specifications, maxPrice) => {
          this.actR.queryParams
            .pipe(
              debounceTime(500),
              switchMap((queryParameters) => {
                this.queries = Object.fromEntries(
                  Object.entries(queryParameters).map(([key, value]) => [key, (value as string).split(',')] as string[])
                ) as Params

                this.setSliderOptions(
                  (queryParameters['priceFrom'] as number) ?? 0,
                  (queryParameters['priceTo'] as number) ?? maxPrice,
                  maxPrice ?? 9999
                )

                setTimeout(() => {
                  this.onUserChange(
                    (queryParameters['priceFrom'] as number) ?? 0,
                    (queryParameters['priceTo'] as number) ?? maxPrice
                  )
                })

                const filteredSpecifications = specifications
                  .filter((spec) => !!this.queries && Object.keys(this.queries).includes(spec.nameUrlFriendly))
                  .map((spec) => ({
                    ...spec,
                    values: spec.values?.filter((item) =>
                      this.queries[spec.nameUrlFriendly].includes(item.valueUrlFriendly)
                    ),
                  }))

                const specificationIds = filteredSpecifications
                  .map((spec) => (spec.values ?? []).map((item) => item.id).join(','))
                  .join('_')

                if (this.catInfo) {
                  this.productOptions = {
                    page: this.page,
                    limit: this.limit,
                    ...(this.catInfo.isSuper
                      ? { categories: [this.catInfo.catId] }
                      : { categoryId: this.catInfo.catId }),
                    ...(specificationIds ? { specificationIds: specificationIds } : {}),
                    ...(queryParameters['priceFrom'] ? { priceFrom: queryParameters['priceFrom'] as number } : {}),
                    ...(queryParameters['priceTo'] ? { priceTo: queryParameters['priceTo'] as number } : {}),
                  }
                }

                if (this.preCausePrice(queryParameters['priceFrom'] as number, queryParameters['priceTo'] as number)) {
                  this.router
                    .navigate([], {
                      relativeTo: this.actR,
                      queryParams: { priceFrom: 0, priceTo: maxPrice },
                      queryParamsHandling: 'merge',
                      replaceUrl: true,
                    })
                    .catch((error: unknown) => {
                      console.error(error)
                    })
                } else this.FiltersChanged.emit(this.productOptions)

                return []
              })
            )
            .subscribe()
        })
      })
    })
  }

  private loadFilters(
    categoryId: number,
    callback: (specifications: ISpecification[], maxPrice?: number) => void
  ): void {
    this.apiService
      .filter(categoryId)
      .pipe(delay(10))
      .subscribe({
        next: (data: IFilterResponse) => {
          if ((data.maxPrice === 0 && data.minPrice === 0) || data.errors.length > 0) {
            this.router.navigate(['/not-found'], { replaceUrl: true }).catch((error: unknown) => {
              console.error(error)
            })
            return
          }
          data.specifications.forEach((spec) => (spec.active = true))
          data.specifications.forEach((spec) => {
            if (spec.values) {
              spec.valuesAmount = spec.values?.length
              if (spec.values?.length > 4) {
                spec.showAll = false
              }
            }
          })
          this.filterResponse = data
          this.specifications = data.specifications
          callback(this.specifications, data.maxPrice)
        },
        error: (error) => {
          console.error(error)
        },
      })
  }

  private preCausePrice(minValue: number, maxValue: number): boolean {
    return minValue == maxValue
  }

  private determineProduct(parameters: Params, callback: (categoryInfo: ICategoryInfo) => void): void {
    const url = parameters['products'] as string
    const lastSegment = url.slice(url.lastIndexOf('-') + 1)
    const isSuper = url.at(-1) === 's'
    const categoryId = Number(
      Array.from(lastSegment)
        .filter((char) => char >= '0' && char <= '9')
        .join('')
    )

    this.catInfo = {
      catId: categoryId,
      isSuper,
    }
    callback(this.catInfo)
  }

  private handleInputs(): void {
    setTimeout(() => {
      this.cdr.detectChanges()

      const minInput = document.querySelector<HTMLInputElement>('#min')
      const maxInput = document.querySelector<HTMLInputElement>('#max')

      if (minInput) {
        minInput.addEventListener('input', (event) => {
          const input = event.target as HTMLInputElement
          let value = input.value

          if (value === '0') {
            this.minValue = 0
            this.onUserChangeEnd(this.minValue, this.maxValue)
            return
          }

          value = value.replace(/^0+/, '')
          input.value = value === '' ? '' : value

          this.minValue = value === '' ? 0 : parseInt(value, 10)
          this.onUserChangeEnd(this.minValue, this.maxValue)
        })
      }

      if (maxInput) {
        maxInput.addEventListener('input', (event) => {
          const input = event.target as HTMLInputElement
          let value = input.value

          if (value === '0') {
            this.maxValue = 0
            this.onUserChangeEnd(this.minValue, this.maxValue)
            return
          }

          value = value.replace(/^0+/, '')
          input.value = value === '' ? '' : value
          let parsedValue = value === '' ? 0 : parseInt(value, 10)

          const maxAllowed = this.filterResponse?.maxPrice ?? Number.MAX_SAFE_INTEGER

          if (parsedValue > maxAllowed) {
            parsedValue = maxAllowed
            input.value = String(maxAllowed)
          }

          this.maxValue = parsedValue
          this.onUserChangeEnd(this.minValue, this.maxValue)
        })
      }
    }, 1000)
  }

  public clearFilters(): void {
    this.queries = {}
    this.router
      .navigate([], {
        relativeTo: this.actR,
        queryParams: {},
        queryParamsHandling: 'replace',
        replaceUrl: true,
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }

  public getValuesHeight(index: number): string {
    const count = this.filterResponse?.specifications[index].values?.length ?? 0
    const gap = count * EFilter.GAP
    const height = count > 1 ? count * EFilter.VALUE_HEIGHT + gap - EFilter.GAP : EFilter.VALUE_HEIGHT
    return `${height.toString()}px`
  }

  public setSliderOptions(value: number, highValue: number, ceil: number): void {
    this.minValue = value ?? 0
    this.maxValue = highValue ?? 9999
    this.options = {
      floor: 0,
      ceil: ceil,
    }
  }

  public onUserChange(value: number, highValue?: number): void {
    const minElement = document.querySelector<HTMLElement>('.ngx-slider-pointer-min')
    const maxElement = document.querySelector<HTMLElement>('.ngx-slider-pointer-max')
    minElement?.style.setProperty('--before-content', `'${value.toString()} ₾'`)
    maxElement?.style.setProperty('--before-content', `'${(highValue ?? 9999).toString()} ₾'`)
  }

  public onUserChangeEnd(value: number, highValue?: number): void {
    this.router
      .navigate([], {
        relativeTo: this.actR,
        queryParams: { priceFrom: value, priceTo: highValue ?? 9999 },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }

  public tooglePrice(): void {
    this.showPrice = !this.showPrice
  }

  public preventText(event: KeyboardEvent): void {
    const invalidChars = ['e', 'E', '+', '-', '.']
    if (invalidChars.includes(event.key)) {
      event.preventDefault()
    }
  }

  public setQuery(parent: string, child: string): void {
    if (this.queries) {
      if (!this.queries[parent]?.includes(child)) {
        this.queries[parent] = [...(this.queries[parent] || []), child]
      } else {
        this.queries[parent].splice(this.queries[parent].indexOf(child), 1)
        if (this.queries[parent].length === 0) {
          delete this.queries[parent]
        }
      }
    } else {
      this.queries = {
        [parent]: [child],
      }
    }

    const parameters = Object.fromEntries(
      Object.entries(this.queries).map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])
    )

    this.router
      .navigate([], {
        relativeTo: this.actR,
        queryParams: parameters,
        queryParamsHandling: 'replace',
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }

  public getQuery(parent: string, child: string): boolean {
    return !!this.queries?.[parent]?.includes(child)
  }
}
