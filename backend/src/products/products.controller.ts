import { Controller, Get, Query, Headers } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  products(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Query('Page') page: number,
    @Query('Limit') limit: number,
    @Query('Name') name: string,
    @Query('NotInStock') notInStock: boolean,
    @Query('CategoryId') categoryId: number,
    @Query('Categories') categories: string,
    @Query('SpecificationIds') specificationIds: string,
    @Query('MinPrice') priceFrom: number,
    @Query('MaxPrice') priceTo: number,
    @Query('PriceAsc') priceAsc: boolean,
    @Query('NameAsc') nameAsc: boolean
  ): Promise<unknown> {
    return this.productsService.products(
      lang,
      accessToken,
      page,
      limit,
      name,
      notInStock,
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
