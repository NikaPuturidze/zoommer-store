import { Module } from '@nestjs/common'
import { DeleteFavouriteService } from './delete-favourite.service'
import { DeleteFavouriteController } from './delete-favourite.controller'

@Module({
  controllers: [DeleteFavouriteController],
  providers: [DeleteFavouriteService],
})
export class DeleteFavouriteModule {}
