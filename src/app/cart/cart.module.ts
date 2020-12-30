import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {NgxImageCompressService} from 'ngx-image-compress';


@NgModule({
  declarations: [CartComponent, ConfirmComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  providers: [NgxImageCompressService],
})
export class CartModule {
}
