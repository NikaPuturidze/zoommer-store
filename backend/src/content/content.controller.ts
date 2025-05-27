import { Controller, Get, Headers } from '@nestjs/common'
import { ContentService } from './content.service'

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  @Get()
  content(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.contentService.megaMenu(lang, accessToken)
  }
}
