import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GonulluCreatePage } from './gonullu-create.page';

const routes: Routes = [
  {
    path: '',
    component: GonulluCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GonulluCreatePageRoutingModule {}
