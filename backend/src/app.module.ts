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
import { CookieModule } from './cookie/cookie.module'
import { UserModule } from './user/user.module'
import { TokenModule } from './token/token.module'
import { LoginModule } from './login/login.module'
import { PopularSearchesModule } from './popular-searches/popular-searches.module'
import { ProfileModule } from './profile/profile.module'
import { CartModule } from './cart/cart.module'
import { RenewModule } from './renew/renew.module'
import { WishlistModule } from './wishlist/wishlist.module'
import { ClearAllWishlistModule } from './clear-all-wishlist/clear-all-wishlist.module'
import { SetSubscribeModule } from './set-subscribe/set-subscribe.module'
import { AddFavouriteModule } from './add-favourite/add-favourite.module'
import { DeleteFavouriteModule } from './delete-favourite/delete-favourite.module'

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
    CookieModule,
    UserModule,
    TokenModule,
    LoginModule,
    PopularSearchesModule,
    ProfileModule,
    CartModule,
    RenewModule,
    WishlistModule,
    ClearAllWishlistModule,
    SetSubscribeModule,
    AddFavouriteModule,
    DeleteFavouriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
