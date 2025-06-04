import { Routes } from '@angular/router'
import { InfoComponent } from './info/info.component'
import { MainComponent } from './main/main.component'
import { ProductsComponent } from './products/products.component'
import { DetailsComponent } from './details/details.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AllCategoriesComponent } from './all-categories/all-categories.component'
import { PromotionDetailComponent } from './promotion/promotion-detail/promotion-detail.component'
import { PromotionComponent } from './promotion/promotion.component'
import { SearchComponent } from './search/search.component'
import { ProfileComponent } from './profile/profile.component'
import { profileGuard } from './services/guards/profile.guard'
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component'
import { OrdersComponent } from './profile/orders/orders.component'
import { WishlistComponent } from './profile/wishlist/wishlist.component'
import { NotificationsComponent } from './profile/notifications/notifications.component'
import { SecurityPolicyComponent } from './profile/security-policy/security-policy.component'
import { CartComponent } from './cart/cart.component'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    title: 'Zoommer.ge',
  },
  {
    path: 'info/:topic',
    component: InfoComponent,
  },
  {
    path: 'all-category',
    component: AllCategoriesComponent,
    title: 'Zoommer.ge',
  },
  {
    path: 'search/:keyword',
    component: SearchComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'promotion',
    component: PromotionComponent,
    title: 'Zoommer.ge',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: '404',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
    canActivate: [profileGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [profileGuard],
    title: 'Profile',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edit-profile',
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'policy',
        component: SecurityPolicyComponent,
      },
    ],
  },
  {
    path: 'promotion/:detail',
    component: PromotionDetailComponent,
  },
  {
    path: ':category/:product',
    component: DetailsComponent,
  },
  {
    path: ':products',
    component: ProductsComponent,
    title: 'Zoommer.ge',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
]
