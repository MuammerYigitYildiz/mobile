import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../app/util/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'gonullu-edit',
    loadChildren: () => import('./gonullu-edit/gonullu-edit.module').then( m => m.GonulluEditPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'gonullu-create',
    loadChildren: () => import('./gonullu-create/gonullu-create.module').then( m => m.GonulluCreatePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'tanimlama',
    loadChildren: () => import('./tanimlama/tanimlama.module').then( m => m.TanimlamaPageModule),
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
