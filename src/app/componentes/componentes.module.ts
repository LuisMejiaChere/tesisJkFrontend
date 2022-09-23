import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalActualizarCriterioComponent } from "./modal-actualizar-criterio/modal-actualizar-criterio.component";
import { IconModule } from "@visurel/iconify-angular";
import { ModalActualizarPeriodoComponent } from "./modal-actualizar-periodo/modal-actualizar-periodo.component";
import { ModalActualizarSubcriterioComponent } from "./modal-actualizar-subcriterio/modal-actualizar-subcriterio.component";
import { ModalActualizarIndicadorComponent } from "./modal-actualizar-indicador/modal-actualizar-indicador.component";
import { ModalActualizarModeloCarreraComponent } from './modal-actualizar-modelo-carrera/modal-actualizar-modelo-carrera.component';
import { ModalActualizarEvidenciaComponent } from "./modal-actualizar-evidencia/modal-actualizar-evidencia.component";
import { ModalDialodErrorComponent } from "./modal-dialog-error/modal-dialog-error.component";
import { DirectivasModule } from "../directivas/directivas.module";
import { ArrastrarYSoltarDirective } from "../directivas/arrastrar-y-soltar-directive/arrastrar-y-soltar.directive";

import {MatDialogModule} from '@angular/material/dialog';
import { ModalActualizarEvaluadorComponent } from "./modal-actualizar-evaluador/modal-actualizar-evaluador.component";
import { ModalActualizarMiPerfilComponent } from "./modal-actualizar-mi-perfil/modal-actualizar-mi-perfil.component";

@NgModule({
  declarations: [
    ModalActualizarCriterioComponent,
    ModalActualizarPeriodoComponent,
    ModalActualizarSubcriterioComponent,
    ModalActualizarIndicadorComponent,
    ModalActualizarModeloCarreraComponent,
    ModalActualizarEvidenciaComponent,
    ModalDialodErrorComponent,
    ModalActualizarEvaluadorComponent,
    ModalActualizarMiPerfilComponent,
    ArrastrarYSoltarDirective
    
  ],
  entryComponents: [
    ModalActualizarCriterioComponent,
    ModalActualizarPeriodoComponent,
    ModalActualizarSubcriterioComponent,
    ModalActualizarIndicadorComponent,
    ModalActualizarModeloCarreraComponent,
    ModalActualizarEvidenciaComponent,
    ModalDialodErrorComponent,
    ModalActualizarEvaluadorComponent,
    ModalActualizarMiPerfilComponent,
    ArrastrarYSoltarDirective
    
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    IconModule,
    // MatDialogModule
  ],
  exports: [
    ModalActualizarCriterioComponent,
    ModalActualizarPeriodoComponent,
    ModalActualizarSubcriterioComponent,
    ModalActualizarIndicadorComponent,
    ModalActualizarModeloCarreraComponent,
    ModalActualizarEvidenciaComponent,
    ModalDialodErrorComponent,
    ModalActualizarEvaluadorComponent,
    ModalActualizarMiPerfilComponent,
    ArrastrarYSoltarDirective
  ],
})
export class ComponenteModule {}
