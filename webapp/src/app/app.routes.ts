import { Routes } from '@angular/router'
import { InfoComponent } from './info/info.component'
import { MainComponent } from './main/main.component'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'info/:topic',
    component: InfoComponent,
  },
]
