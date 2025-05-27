import { Controller, Get, Query, Headers } from '@nestjs/common'
import { PromotionDetailService } from './promotion-detail.service'

@Controller('promotion-detail')
export class PromotionDetailController {
  constructor(private readonly promotionDetailService: PromotionDetailService) {}

  @Get()
  topic(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Query('Page') page: number,
    @Query('Limit') limit: number,
    @Query('PromotionId') promotionId: number,
    @Query('CategoryIds') categoryIds?: number[]
  ): Promise<unknown> {
    return this.promotionDetailService.detail(lang, accessToken, page, limit, promotionId, categoryIds)
  }
}
