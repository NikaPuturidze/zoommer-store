import { Controller, Get, Headers } from '@nestjs/common'
import { WishlistService } from './wishlist.service'

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  wishlist(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.wishlistService.wishlist(lang, accessToken)
  }
}
