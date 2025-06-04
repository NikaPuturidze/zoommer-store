import { Module } from '@nestjs/common'
import { AddFavouriteService } from './add-favourite.service'
import { AddFavouriteController } from './add-favourite.controller'

@Module({
  controllers: [AddFavouriteController],
  providers: [AddFavouriteService],
})
export class AddFavouriteModule {}
