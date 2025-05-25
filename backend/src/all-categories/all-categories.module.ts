import { Module } from '@nestjs/common'
import { AllCategoriesService } from './all-categories.service'
import { AllCategoriesController } from './all-categories.controller'

@Module({
  controllers: [AllCategoriesController],
  providers: [AllCategoriesService],
})
export class AllCategoriesModule {}
