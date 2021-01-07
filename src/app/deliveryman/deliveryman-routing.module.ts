import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DeliverymanComponent} from './deliveryman.component';

const routes: Routes = [{path: '', component: DeliverymanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliverymanRoutingModule {
}
