import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TopicsModule } from './topics/topics.module'
import { MegaMenuModule } from './mega-menu/mega-menu.module'
import { ContentModule } from './content/content.module'
import { TopicModule } from './topic/topic.module'
import { ProductsModule } from './products/products.module'
import { FilterModule } from './filter/filter.module'
import { DetailsModule } from './details/details.module'

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
