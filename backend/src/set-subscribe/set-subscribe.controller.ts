import { Controller, Post, Headers, Body } from '@nestjs/common'
import { SetSubscribeService } from './set-subscribe.service'

@Controller('set-subscribe')
export class SetSubscribeController {
  constructor(private readonly setSubscribeService: SetSubscribeService) {}

  @Post()
  setSubscribe(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('subscribe') subscribe: string
  ): Promise<unknown> {
    return this.setSubscribeService.setSubscribe(lang, accessToken, subscribe)
  }
}
