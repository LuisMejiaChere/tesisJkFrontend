import { Injectable, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { UsuarioRepository } from "./usuario/usuario.repository";
import { CriterioRepository } from "./criterio/criterio.repository";
import { SubcriterioRepository } from "./subcriterio/subcriterio.repository";
import { PeriodoLectivoRepository } from "./periodo-lectivo/periodo-lectivo.repository";
import { IndicadorRepository } from "./indicador/indicador.repository";
import { ModeloCarreraRepository } from "./modelo-carrera/modelo-carrera.repository";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    UsuarioRepository,
    CriterioRepository,
    SubcriterioRepository,
    PeriodoLectivoRepository,
    IndicadorRepository,
    ModeloCarreraRepository
    
  ],
})
export class RepositorioModule {}
