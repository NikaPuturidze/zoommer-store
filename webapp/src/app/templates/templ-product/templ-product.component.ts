import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { IProduct } from '../../../interfaces/content.interface'
import { LocalStorageService } from '../../services/localstorage.service'
import { Router } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { SrcsetDirective } from '../../services/directives/srcset.directive'
import { ApiService } from '../../services/api.service'
import { CartService } from '../../services/cart.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { ICart } from 'webapp/src/interfaces/cart.interface'

@UntilDestroy()
@Component({
  selector: 'app-templ-product',
  imports: [TranslateModule, SrcsetDirective],
  templateUrl: './templ-product.component.html',
  styleUrl: './templ-product.component.scss',
})
export class TemplProductComponent implements OnInit {
  @Input() product?: IProduct
  @Input() route?: string[]
  @Input() imageUrl?: string
  @Input() productPrice?: number
  @Input() productSalePrice?: number
  @Input() productName?: string
  @Input() labelText?: string
  @Input() productId?: number
  public showGrid?: string
  public isInCart

  constructor(
    public translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiService: ApiService,
    public cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })

    this.cartService.cart$.pipe(untilDestroyed(this)).subscribe((cart) => {
      const effectiveId = this.getEffectiveProductId()
      this.isInCart = effectiveId ? (cart?.items?.some((item) => item.productId === effectiveId) ?? false) : false
      this.cdr.detectChanges()
    })
  }

  private getEffectiveProductId(): number | undefined {
    return this.product?.id ?? this.productId
  }

  public navigate(route: string[] | undefined): void {
    if (!route) return
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }

  public roundPrice(price: number): number {
    return Math.floor(price)
  }

  public addToCart(productId: number): void {
    this.apiService.cartPost(productId, 1).subscribe({
      next: () => {
        this.cart()
        this.cdr.detectChanges()
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public cart(): void {
    this.apiService.cart().subscribe({
      next: (data: ICart) => {
        this.cartService.setCart(data)
        this.cdr.detectChanges()
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }
}
