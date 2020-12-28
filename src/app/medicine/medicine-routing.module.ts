import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AllComponent} from './all/all.component';
import {InsertComponent} from './insert/insert.component';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllComponent
  },
  {
    path: 'insert',
    component: InsertComponent
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: '',
    redirectTo: 'all'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule {
}
