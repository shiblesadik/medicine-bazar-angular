import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeliverymanRoutingModule} from './deliveryman-routing.module';
import {DeliverymanComponent} from './deliveryman.component';
import {OrderComponent} from './order/order.component';
import {ModalModule} from 'ngb-modal';


@NgModule({
  declarations: [DeliverymanComponent, OrderComponent],
  imports: [
    CommonModule,
    DeliverymanRoutingModule,
    ModalModule
  ]
})
export class DeliverymanModule {
}
