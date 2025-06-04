import { Controller, Headers, Post } from '@nestjs/common'
import { ClearAllWishlistService } from './clear-all-wishlist.service'

@Controller('clear-all-wishlist')
export class ClearAllWishlistController {
  constructor(private readonly clearAllWishlistService: ClearAllWishlistService) {}

  @Post()
  clearAllWishlist(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string
  ): Promise<unknown> {
    return this.clearAllWishlistService.clearAllWishlist(lang, accessToken)
  }
}
