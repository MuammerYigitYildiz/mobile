import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import { DatePipe } from '@angular/common';

import {TanimlamaPageRoutingModule} from './tanimlama-routing.module';

import {TanimlamaPage} from './tanimlama.page';
import {GonulluEditPage} from "../gonullu-edit/gonullu-edit.page";
import {IlComponent} from "../referans/il/il.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TanimlamaPageRoutingModule
  ],
  providers: [
    DatePipe,
  ],
  declarations: [TanimlamaPage],
  exports: [
    TanimlamaPage],
  bootstrap: [TanimlamaPage]
})
export class TanimlamaPageModule {
}
