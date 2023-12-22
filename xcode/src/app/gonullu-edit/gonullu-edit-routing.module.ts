import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GonulluEditPage } from './gonullu-edit.page';

const routes: Routes = [
  {
    path: '',
    component: GonulluEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GonulluEditPageRoutingModule {}
