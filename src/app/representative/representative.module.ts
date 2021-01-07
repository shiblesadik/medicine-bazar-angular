import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RepresentativeRoutingModule} from './representative-routing.module';
import {RepresentativeComponent} from './representative.component';
import { OrderComponent } from './order/order.component';
import {ModalModule} from 'ngb-modal';


@NgModule({
  declarations: [RepresentativeComponent, OrderComponent],
  imports: [
    CommonModule,
    RepresentativeRoutingModule,
    ModalModule
  ]
})
export class RepresentativeModule {
}
