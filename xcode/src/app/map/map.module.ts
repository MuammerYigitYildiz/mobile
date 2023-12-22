// map.module.ts

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
