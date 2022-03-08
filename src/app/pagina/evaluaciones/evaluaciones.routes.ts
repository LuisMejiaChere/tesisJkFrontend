import { Routes, RouterModule } from "@angular/router";
import { VexRoutes } from "../../../@vex/interfaces/vex-route.interface";
import { NgModule } from "@angular/core";
import { ModeloCarreraComponent } from "./modelo-carrera/modelo-carrera.component";



const appRoutesPages: VexRoutes = [
  { path: "modelo-carrera", component: ModeloCarreraComponent },
//   { path: "periodo-lectivo", component: PeriodoLectivoComponent },
//   { path: "subcriterios", component: SubCriteriosComponent },
//   { path: "indicadores", component: IndicadoresComponent },

  { path: '**', redirectTo: 'modelo-carrera', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutesPages)],
  exports: [RouterModule],
})
export class EvaluacionesRouteModule {}
