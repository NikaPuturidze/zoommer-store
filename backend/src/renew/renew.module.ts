import { Module } from '@nestjs/common'
import { RenewService } from './renew.service'
import { RenewController } from './renew.controller'

@Module({
  controllers: [RenewController],
  providers: [RenewService],
})
export class RenewModule {}
