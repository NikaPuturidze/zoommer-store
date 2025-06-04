import { Component } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { CartService } from '../services/cart.service'
import { AsyncPipe } from '@angular/common'
import { MatRippleModule } from '@angular/material/core'
import { ApiService } from '../services/api.service'
import { ICart } from 'webapp/src/interfaces/cart.interface'

@Component({
  selector: 'app-cart',
  imports: [TranslateModule, AsyncPipe, MatRippleModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    public cartService: CartService,
    private apiService: ApiService
  ) {}

  public setCartAmount(productId: number, quantity: number): void {
    this.apiService.cartPost(productId, quantity).subscribe({
      next: () => {
        this.cart()
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
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }
}
