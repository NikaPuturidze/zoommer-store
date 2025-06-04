import { Controller, Post, Headers, Body } from '@nestjs/common'
import { DeleteFavouriteService } from './delete-favourite.service'

@Controller('delete-favourite')
export class DeleteFavouriteController {
  constructor(private readonly deleteFavouriteService: DeleteFavouriteService) {}

  @Post()
  addFavourite(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('id') id: string
  ): Promise<unknown> {
    return this.deleteFavouriteService.deleteFavouriteService(lang, accessToken, id)
  }
}
