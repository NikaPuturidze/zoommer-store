import { Controller, Get, Query, Headers } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  topic(
    @Headers('accept-language') lang: string,
    @Query('Page') page: number,
    @Query('Limit') limit: number,
    @Query('CategoryId') categoryId: number,
    @Query('Categories') categories: number,
    @Query('SpecificationIds') specificationIds: string,
    @Query('MinPrice') priceFrom: number,
    @Query('MaxPrice') priceTo: number,
    @Query('PriceAsc') priceAsc: boolean,
    @Query('NameAsc') nameAsc: boolean
  ): Promise<unknown> {
    return this.productsService.products(
      lang,
      page,
      limit,
      specificationIds,
      categoryId,
      categories,
      priceFrom,
      priceTo,
      priceAsc,
      nameAsc
    )
  }
}
