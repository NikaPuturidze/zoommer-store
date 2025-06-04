import { Controller, Get, Headers } from '@nestjs/common'
import { PopularSearchesService } from './popular-searches.service'

@Controller('popular-searches')
export class PopularSearchesController {
  constructor(private readonly popularSearchesService: PopularSearchesService) {}

  @Get()
  popularSearches(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string
  ): Promise<unknown> {
    return this.popularSearchesService.popularSearches(lang, accessToken)
  }
}
