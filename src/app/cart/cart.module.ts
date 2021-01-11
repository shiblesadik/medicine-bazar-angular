import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CartComponent, ConfirmComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule
  ],
  providers: [NgxImageCompressService],
})
export class CartModule {
}
