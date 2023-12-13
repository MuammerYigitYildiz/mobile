import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoginPageRoutingModule} from './login-routing.module';
import {LoginPage} from "./login.page";
import {NgxEventHandlerModule} from 'ngx-event-handler';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxEventHandlerModule,
    FormsModule,


  ],
  declarations: [
    LoginPage,
  ]
})
export class LoginModule {
}
