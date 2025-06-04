import { Controller, Get, Query, Headers } from '@nestjs/common'
import { FilterService } from './filter.service'

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  filter(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Query('catId') catId: number
  ): Promise<unknown> {
    return this.filterService.filter(lang, catId, accessToken)
  }
}
