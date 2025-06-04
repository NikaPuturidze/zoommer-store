import { Controller, Get, Headers } from '@nestjs/common'
import { PromotionService } from './promotion.service'

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  promotion(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.promotionService.promotion(lang, accessToken)
  }
}
