import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GonulluEditPageRoutingModule} from './gonullu-edit-routing.module';

import {GonulluEditPage} from './gonullu-edit.page';
import {IlComponent} from "../referans/il/il.component";
import {BedenComponent} from "../referans/beden/beden.component";
import {CinsiyetComponent} from "../referans/cinsiyet/cinsiyet.component";
import {OgrenimDurumuComponent} from "../referans/ogrenim-durumu/ogrenim-durumu.component";
import {KanGrubuComponent} from "../referans/kan-grubu/kan-grubu.component";
import {MapModule} from "../map/map.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GonulluEditPageRoutingModule,
        MapModule
    ],
  declarations: [GonulluEditPage,
    IlComponent, BedenComponent, CinsiyetComponent, OgrenimDurumuComponent, KanGrubuComponent],
  exports: [
    GonulluEditPage,
    IlComponent],
  bootstrap: [GonulluEditPage]
})
export class GonulluEditPageModule {
}
