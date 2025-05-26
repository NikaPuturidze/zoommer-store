import { Module } from '@nestjs/common'
import { PromotionDetailService } from './promotion-detail.service'
import { PromotionDetailController } from './promotion-detail.controller'

@Module({
  controllers: [PromotionDetailController],
  providers: [PromotionDetailService],
})
export class PromotionDetailModule {}
