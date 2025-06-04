import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { IProduct } from '../../../interfaces/product.interface'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Router, RouterModule } from '@angular/router'
import { MatRippleModule } from '@angular/material/core'
import { CookieService } from 'ngx-cookie-service'
import { AuthService } from '../../services/auth.service'
import { CartService } from '../../services/cart.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { ApiService } from '../../services/api.service'
import { ICart } from 'webapp/src/interfaces/cart.interface'
import { combineLatest, Subject } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'app-buy',
  imports: [ContentLoaderModule, TranslateModule, RouterModule, MatRippleModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
})
export class BuyComponent implements OnInit, OnChanges {
  @Input() product?: IProduct
  public isInCart
  private product$ = new Subject<IProduct | undefined>()

  constructor(
    public translateService: TranslateService,
    private router: Router,
    private cookie: CookieService,
    private authService: AuthService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    combineLatest([this.cartService.cart$, this.product$])
      .pipe(untilDestroyed(this))
      .subscribe(([cart, product]) => {
        this.isInCart = !!product && cart?.items?.some((item) => item.productId === product.id)
        this.cdr.detectChanges()
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.product$.next(this.product)
    }
  }

  public navigateTo(route: string[]): void {
    if (this.cookie.get('user-authed') && this.cookie.get('access-token')) {
      this.router.navigate(route).catch((error: unknown) => {
        console.error(error)
      })
    } else {
      this.authService.openPopup()
    }
  }

  public addToCart(productId: number): void {
    if (this.cookie.get('user-authed') && this.cookie.get('access-token')) {
      this.addToCartA(productId)
      this.cdr.detectChanges()
    } else {
      this.authService.openPopup()
    }
  }

  public addToCartA(productId: number): void {
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
