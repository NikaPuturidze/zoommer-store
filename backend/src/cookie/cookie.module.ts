import { Module } from '@nestjs/common'
import { CookieService } from './cookie.service'
import { CookieController } from './cookie.controller'

@Module({
  controllers: [CookieController],
  providers: [CookieService],
})
export class CookieModule {}
