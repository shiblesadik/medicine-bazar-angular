import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './admin.component';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: '',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
