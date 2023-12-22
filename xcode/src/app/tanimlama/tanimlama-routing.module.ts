import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TanimlamaPage } from './tanimlama.page';

const routes: Routes = [
  {
    path: '',
    component: TanimlamaPage
  },
  {
    path: 'belge',
    data: { breadcrumb: 'Belge' },
    loadChildren: () => import('./belge/belge.module').then(m => m.BelgeModule)
  },
  {
    path: 'egitim',
    data: { breadcrumb: 'Eğitim' },
    loadChildren: () => import('./egitim/egitim.module').then(m => m.EgitimModule)
  },
  {
    path: 'ekipman',
    data: { breadcrumb: 'Ekipman' },
    loadChildren: () => import('./ekipman/ekipman.module').then(m => m.EkipmanModule)
  },
  {
    path: 'tatbikat',
    data: { breadcrumb: 'Tatbikat' },
    loadChildren: () => import('./tatbikat/tatbikat.module').then(m => m.TatbikatModule)
  },
  {
    path: 'yangin',
    data: { breadcrumb: 'Yangin' },
    loadChildren: () => import('./yangin/yangin.module').then(m => m.YanginModule)
  },
  {
    path: 'kkd',
    data: { breadcrumb: 'Kkd' },
    loadChildren: () => import('./kkd/kkd.module').then(m => m.KkdModule)
  },
  {
    path: 'uzmanlik',
    data: { breadcrumb: 'Uzmanlik' },
    loadChildren: () => import('./uzmanlik/uzmanlik.module').then(m => m.UzmanlikModule)
  },
  {
    path: '**',
    redirectTo: '/account'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TanimlamaPageRoutingModule {}
