import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VexRoutes } from '../../@vex/interfaces/vex-route.interface';
import { NgModule } from '@angular/core';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { AdmininistradorGuard } from '../guards/administrador.guard';
import { E404Component } from './404/404.component';
import { PersonalComponent } from './personal/personal.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';


const appRoutesPages: VexRoutes = [
        { path: 'tablero', component: DashboardComponent },
        {
                path: 'configuraciones',
                component: ConfiguracionesComponent,
                loadChildren: () => import('src/app/pagina/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule),
                data:{
                        role: '1'
                },
                canActivate: [AdmininistradorGuard]
        },
        {
                path: 'evaluaciones',
                component: EvaluacionesComponent,
                loadChildren: () => import('src/app/pagina/evaluaciones/evaluaciones.module').then(m => m.EvaluacionesModule)
        },
        {
                path: 'personal',
                component: PersonalComponent,
                loadChildren: () => import('src/app/pagina/personal/personal.module').then(m => m.PersonalModule)
        },

        {
                path: '404',
                component: E404Component,
                // loadChildren: () => import('src/app/pagina/evaluaciones/evaluaciones.module').then(m => m.EvaluacionesModule)
        },
        {
                path: 'miperfil',
                component: MiPerfilComponent,
                // loadChildren: () => import('src/app/pagina/evaluaciones/evaluaciones.module').then(m => m.EvaluacionesModule)
        },

        
       
        { path: '**', redirectTo: 'tablero', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forChild(appRoutesPages)],
    exports: [RouterModule]
  })
  export class PagesRouteModule {
  }
  