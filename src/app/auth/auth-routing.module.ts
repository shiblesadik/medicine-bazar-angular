import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {DoctorComponent} from './doctor/doctor.component';
import {DeliverymanComponent} from './deliveryman/deliveryman.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent
  },
  {
    path: 'deliveryman',
    component: DeliverymanComponent
  },
  {
    path: 'admin',
    component: UserComponent
  },
  {
    path: '',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}