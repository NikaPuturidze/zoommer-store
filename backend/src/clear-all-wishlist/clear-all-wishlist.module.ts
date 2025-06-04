import { Module } from '@nestjs/common'
import { ClearAllWishlistService } from './clear-all-wishlist.service'
import { ClearAllWishlistController } from './clear-all-wishlist.controller'

@Module({
  controllers: [ClearAllWishlistController],
  providers: [ClearAllWishlistService],
})
export class ClearAllWishlistModule {}
