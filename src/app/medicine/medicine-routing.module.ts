import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AllComponent} from './all/all.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllComponent
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
