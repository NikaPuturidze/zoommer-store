import { Controller, Get, Headers } from '@nestjs/common'
import { PromotionService } from './promotion.service'

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  topic(@Headers('accept-language') lang: string): Promise<unknown> {
    return this.promotionService.promotion(lang)
  }
}
