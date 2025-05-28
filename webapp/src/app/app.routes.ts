import { Routes } from '@angular/router'
import { InfoComponent } from './info/info.component'
import { MainComponent } from './main/main.component'
import { ProductsComponent } from './products/products.component'
import { DetailsComponent } from './details/details.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AllCategoriesComponent } from './all-categories/all-categories.component'
import { PromotionDetailComponent } from './promotion/promotion-detail/promotion-detail.component'
import { PromotionComponent } from './promotion/promotion.component'

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
    path: 'promotion',
    component: PromotionComponent,
    title: 'Zoommer.ge',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
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
