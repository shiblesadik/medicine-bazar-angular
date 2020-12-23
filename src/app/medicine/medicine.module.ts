import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicineRoutingModule} from './medicine-routing.module';
import {MedicineComponent} from './medicine.component';
import { AllComponent } from './all/all.component';

@NgModule({
  declarations: [MedicineComponent, AllComponent],
  imports: [
    CommonModule,
    MedicineRoutingModule
  ]
})
export class MedicineModule {
}
