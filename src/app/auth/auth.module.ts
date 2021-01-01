import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {UserComponent} from './user/user.component';
import {FormsModule} from '@angular/forms';
import {AdminComponent} from './admin/admin.component';

@NgModule({
  declarations: [
    AuthComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule {
}
