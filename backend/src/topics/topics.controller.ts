import { Controller, Get, Headers } from '@nestjs/common'
import { TopicsService } from './topics.service'

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  topics(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.topicsService.topics(lang, accessToken)
  }
}
