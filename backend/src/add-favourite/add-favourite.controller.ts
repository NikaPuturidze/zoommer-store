import { Controller, Post, Headers, Body } from '@nestjs/common'
import { AddFavouriteService } from './add-favourite.service'

@Controller('add-favourite')
export class AddFavouriteController {
  constructor(private readonly addFavouriteService: AddFavouriteService) {}

  @Post()
  addFavourite(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('productId') productId: string
  ): Promise<unknown> {
    return this.addFavouriteService.addFavourite(lang, accessToken, productId)
  }
}
