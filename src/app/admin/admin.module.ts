import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {MedicineComponent} from './medicine/medicine.component';
import {OrderComponent} from './order/order.component';
import {UserComponent} from './user/user.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, MedicineComponent, OrderComponent, UserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule {
}
