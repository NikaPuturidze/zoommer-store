import { Controller, Get, Query, Headers } from '@nestjs/common'
import { DetailsService } from './details.service'

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get()
  topic(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Query('productId') productId: number
  ): Promise<unknown> {
    return this.detailsService.details(lang, productId, accessToken)
  }
}
