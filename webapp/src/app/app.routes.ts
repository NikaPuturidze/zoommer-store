import { Routes } from '@angular/router'
import { InfoComponent } from './info/info.component'
import { MainComponent } from './main/main.component'
import { ProductsComponent } from './products/products.component'
import { DetailsComponent } from './details/details.component'
import { NotFoundComponent } from './not-found/not-found.component'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'info/:topic',
    component: InfoComponent,
  },
  {
    path: ':products',
    component: ProductsComponent,
  },
  {
    path: ':category/:product',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]
