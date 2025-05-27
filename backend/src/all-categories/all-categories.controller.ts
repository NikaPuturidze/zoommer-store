import { Controller, Get, Headers } from '@nestjs/common'
import { AllCategoriesService } from './all-categories.service'

@Controller('all-categories')
export class AllCategoriesController {
  constructor(private readonly allCategoriesService: AllCategoriesService) {}
  @Get()
  content(@Headers('accept-language') lang: string, @Headers('authorization') accesToken: string): Promise<unknown> {
    return this.allCategoriesService.allCategories(lang, accesToken)
  }
}
