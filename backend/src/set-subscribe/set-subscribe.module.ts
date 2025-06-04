import { Module } from '@nestjs/common'
import { SetSubscribeService } from './set-subscribe.service'
import { SetSubscribeController } from './set-subscribe.controller'

@Module({
  controllers: [SetSubscribeController],
  providers: [SetSubscribeService],
})
export class SetSubscribeModule {}
