import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicineRoutingModule} from './medicine-routing.module';
import {MedicineComponent} from './medicine.component';
import {AllComponent} from './all/all.component';
import {InsertComponent} from './insert/insert.component';
import {FormsModule} from '@angular/forms';
import {ViewComponent} from './view/view.component';
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [MedicineComponent, AllComponent, InsertComponent, ViewComponent],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    FormsModule,
  ],
  providers: [NgxImageCompressService],
})
export class MedicineModule {
}
