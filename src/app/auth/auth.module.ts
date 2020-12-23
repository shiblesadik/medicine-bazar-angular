import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {UserComponent} from './user/user.component';
import {DoctorComponent} from './doctor/doctor.component';
import {DeliverymanComponent} from './deliveryman/deliveryman.component';
import {FormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment.prod';

@NgModule({
  declarations: [
    AuthComponent,
    UserComponent,
    DoctorComponent,
    DeliverymanComponent
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule {
}
