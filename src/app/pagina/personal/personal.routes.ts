import { Routes, RouterModule } from "@angular/router";
import { VexRoutes } from "../../../@vex/interfaces/vex-route.interface";
import { NgModule } from "@angular/core";
import { EvaluadorComponent } from "./evaluador/evaluador.component";


const appRoutesPages: VexRoutes = [
  { path: "evaluadores", component: EvaluadorComponent },


  // { path: '**', redirectTo: 'criterios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutesPages)],
  exports: [RouterModule],
})
export class PersonalRouteModule {}
