import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject } from 'rxjs'
import { ICart } from 'webapp/src/interfaces/cart.interface'
import { IWishList } from 'webapp/src/interfaces/wishlist.interface'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart$ = new BehaviorSubject<ICart | null>(null)
  public Wishlist$ = new BehaviorSubject<IWishList | null>(null)

  constructor(private cookie: CookieService) {}

  public setCart(cart: ICart): void {
    this.cart$.next(cart)
  }

  public removeCart(): void {
    this.cart$.next(null)
  }

  public setWishlist(wishlist: IWishList): void {
    this.Wishlist$.next(wishlist)
  }

  public removeWishlist(): void {
    this.Wishlist$.next(null)
  }
}
