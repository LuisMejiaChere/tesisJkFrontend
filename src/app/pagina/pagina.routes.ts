import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VexRoutes } from '../../@vex/interfaces/vex-route.interface';
import { NgModule } from '@angular/core';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';


const appRoutesPages: VexRoutes = [
        { path: 'tablero', component: DashboardComponent },
        {
                path: 'configuraciones',
                component: ConfiguracionesComponent,
                loadChildren: () => import('src/app/pagina/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule)
        },
        {
                path: 'evaluaciones',
                component: EvaluacionesComponent,
                loadChildren: () => import('src/app/pagina/evaluaciones/evaluaciones.module').then(m => m.EvaluacionesModule)
        },
       
        { path: '**', redirectTo: 'tablero', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forChild(appRoutesPages)],
    exports: [RouterModule]
  })
  export class PagesRouteModule {
  }
  