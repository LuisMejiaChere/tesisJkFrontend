import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ResPaswwordComponent } from './auth/res-paswword/res-paswword.component';
import { LogeoGuard } from './guards/logeo.guard';
import { NoLogeoGuard } from './guards/no-logeo.guard';

import { PaginaComponent } from './pagina/pagina.component';

const routes: Routes = [
  {
    path: 'logeo', 
    canActivate: [NoLogeoGuard],
    component: LoginComponent
  },
  {
    path: 'restablecer-contrasena', 
    canActivate: [NoLogeoGuard],
    component: ResPaswwordComponent
  },
  {
    path: 'principal',
    canActivate: [LogeoGuard],
    component: PaginaComponent,
    loadChildren: () => import('src/app/pagina/pagina.module').then(m => m.PaginaModule)
  },
  
 
  { path: '', redirectTo: '/logeo', pathMatch: 'full' },
  { path: '**', redirectTo: '/logeo', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
