import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [CartComponent, ConfirmComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
