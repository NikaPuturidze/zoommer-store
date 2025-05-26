import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TopicsModule } from './topics/topics.module'
import { MegaMenuModule } from './mega-menu/mega-menu.module'
import { ContentModule } from './content/content.module'
import { TopicModule } from './topic/topic.module'
import { ProductsModule } from './products/products.module'
import { FilterModule } from './filter/filter.module'
import { DetailsModule } from './details/details.module'
import { AllCategoriesModule } from './all-categories/all-categories.module'
import { PromotionModule } from './promotion/promotion.module'
import { PromotionDetailModule } from './promotion-detail/promotion-detail.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TopicsModule,
    MegaMenuModule,
    ContentModule,
    TopicModule,
    ProductsModule,
    FilterModule,
    DetailsModule,
    AllCategoriesModule,
    PromotionModule,
    PromotionDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
