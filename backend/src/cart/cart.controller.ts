import { Body, Controller, Get, Headers, Post } from '@nestjs/common'
import { CartService } from './cart.service'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  cart(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.cartService.cart(lang, accessToken)
  }

  @Post()
  cartPost(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: string
  ): Promise<unknown> {
    return this.cartService.cartPost(lang, accessToken, productId, quantity)
  }
}
