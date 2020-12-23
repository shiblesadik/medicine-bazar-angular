import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CartComponent} from './cart.component';
import {ConfirmComponent} from './confirm/confirm.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  },
  {
    path: 'confirm',
    component: ConfirmComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
