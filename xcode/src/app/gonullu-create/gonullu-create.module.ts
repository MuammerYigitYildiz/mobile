import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GonulluCreatePageRoutingModule } from './gonullu-create-routing.module';

import { GonulluCreatePage } from './gonullu-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GonulluCreatePageRoutingModule
  ],
  declarations: [GonulluCreatePage]
})
export class GonulluCreatePageModule {}
