import { Module } from '@nestjs/common'
import { PopularSearchesService } from './popular-searches.service'
import { PopularSearchesController } from './popular-searches.controller'

@Module({
  controllers: [PopularSearchesController],
  providers: [PopularSearchesService],
})
export class PopularSearchesModule {}
