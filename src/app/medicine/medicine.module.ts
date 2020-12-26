import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicineRoutingModule} from './medicine-routing.module';
import {MedicineComponent} from './medicine.component';
import {AllComponent} from './all/all.component';
import {InsertComponent} from './insert/insert.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MedicineComponent, AllComponent, InsertComponent],
    imports: [
        CommonModule,
        MedicineRoutingModule,
        FormsModule
    ]
})
export class MedicineModule {
}
