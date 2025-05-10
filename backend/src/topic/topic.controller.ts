import { Controller, Get, Headers, Query } from '@nestjs/common'
import { TopicService } from './topic.service'

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  topic(@Headers('accept-language') lang: string, @Query('title') title: string): Promise<unknown> {
    return this.topicService.topic(lang, title)
  }
}
