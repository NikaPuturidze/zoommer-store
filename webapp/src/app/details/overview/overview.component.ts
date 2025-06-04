import { ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core'
import { IProduct } from '../../../interfaces/product.interface'
import { Router, RouterModule } from '@angular/router'
import { ViewportService } from '../../services/viewport.service'
import { TranslateModule } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { CartService } from '../../services/cart.service'
import { ApiService } from '../../services/api.service'
import { IWishList } from 'webapp/src/interfaces/wishlist.interface'

@UntilDestroy()
@Component({
  selector: 'app-overview',
  imports: [TranslateModule, RouterModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  @Input() product?: IProduct
  public viewportWidth = 0
  private prevWidth: number | null = null
  public isInWIshlist
  private latestWishlist: IWishList | null = null

  constructor(
    private router: Router,
    private viewport: ViewportService,
    private cartService: CartService,
    private hostReference: ElementRef<HTMLElement>,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.updateWishlistState()
  }

  ngOnInit(): void {
    this.viewport.Viewport$.pipe(untilDestroyed(this)).subscribe(({ width }) => {
      this.viewportWidth = width

      if (this.prevWidth !== null) {
        const crossedToSmall = this.prevWidth > 1024 && width <= 1024
        const crossedToLarge = this.prevWidth <= 1024 && width > 1024

        if ((crossedToSmall || crossedToLarge) && this.product?.translateX) {
          this.product.translateX = 0
          this.product.currentImage = 0

          this.hostReference.nativeElement.scrollLeft = 0
        }
      }

      this.prevWidth = width
      this.viewportWidth = width
    })

    this.cartService.Wishlist$.pipe(untilDestroyed(this)).subscribe((list) => {
      this.latestWishlist = list
      this.updateWishlistState()
    })
  }

  private updateWishlistState(): void {
    this.isInWIshlist = this.latestWishlist?.productItems?.some((item) => item.id === this.product?.id) ?? false
    this.cdr.markForCheck()
  }

  public nextImg(): void {
    if (this.product && this.product.currentImage < this.product.images.length - 1) {
      this.product.currentImage++
      this.product.translateX -= 100
    }
  }

  public previousImg(): void {
    if (this.product && this.product.currentImage > 0) {
      this.product.currentImage--
      this.product.translateX += 100
    }
  }

  public moveToSpecific(to: number): void {
    if (this.product) {
      let step = to - this.product.currentImage

      if (step > 0) {
        while (step--) this.nextImg()
      } else {
        while (step++) this.previousImg()
      }
    }
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }

  public addToWishlist(productId: number): void {
    this.apiService.addFavourite(productId).subscribe({
      next: () => {
        this.wishlist()
        this.cdr.detectChanges()
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public deleteFromWishlist(productId: number): void {
    this.apiService.deleteFavourite(productId).subscribe({
      next: () => {
        this.wishlist()
        this.cdr.detectChanges()
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public wishlist(): void {
    this.apiService.wishlist().subscribe({
      next: (data: IWishList) => {
        this.cartService.Wishlist$.next(data)
        this.cdr.detectChanges()
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }
}
