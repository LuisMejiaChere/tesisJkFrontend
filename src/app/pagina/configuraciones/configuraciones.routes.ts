import { Routes, RouterModule } from "@angular/router";
import { VexRoutes } from "../../../@vex/interfaces/vex-route.interface";
import { NgModule } from "@angular/core";
import { CriteriosComponent } from "./criterios/criterios.component";
import { PeriodoLectivoComponent } from "./periodo-lectivo/periodo-lectivo.component";
import { SubCriteriosComponent } from "./sub-criterios/sub-criterios.component";
import { IndicadoresComponent } from "./indicadores/indicadores.component";

const appRoutesPages: VexRoutes = [
  { path: "criterios", component: CriteriosComponent },
  { path: "periodo-lectivo", component: PeriodoLectivoComponent },
  { path: "subcriterios", component: SubCriteriosComponent },
  { path: "indicadores", component: IndicadoresComponent },

  // { path: '**', redirectTo: 'criterios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutesPages)],
  exports: [RouterModule],
})
export class ConfiguracionesRouteModule {}
