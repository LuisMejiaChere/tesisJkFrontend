import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { ModeloCarrera } from 'src/app/modelos/modelo-carrera/modelo-carrera.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icUpload from '@iconify/icons-ic/twotone-drive-folder-upload';
import icClose from '@iconify/icons-ic/twotone-close';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icAdd from '@iconify/icons-ic/twotone-add';

import { NgForm } from '@angular/forms';
import { CriterioRepository } from 'src/app/repositorio/criterio/criterio.repository';
import { SubcriterioRepository } from 'src/app/repositorio/subcriterio/subcriterio.repository';
import { IndicadorRepository } from 'src/app/repositorio/indicador/indicador.repository';
import { PeriodoLectivoRepository } from 'src/app/repositorio/periodo-lectivo/periodo-lectivo.repository';

import  * as myGlobals  from 'src/app/globals';
import { ToolbarNotificationsModule } from 'src/@vex/layout/toolbar/toolbar-notifications/toolbar-notifications.module';



@Component({
  selector: 'vex-modal-actualizar-modelo-carrera',
  templateUrl: './modal-actualizar-modelo-carrera.component.html',
  styleUrls: ['./modal-actualizar-modelo-carrera.component.scss']
})
export class ModalActualizarModeloCarreraComponent implements OnInit {


  disabled
 
  isChecked = true;
  isEvidencias = false;
  accion: string;
  dataPeriodo: any;
  dataModelo: any;
  public message: string;
  datosCargados = false;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  icDelete = icDelete;
  icUpload = icUpload;
  icAdd = icAdd;
  cont = 0;

  constructor(public criterioRepo: CriterioRepository, public periodoRepo: PeriodoLectivoRepository, public indicadorRepo: IndicadorRepository, public subcriterioRepo: SubcriterioRepository, public dialogRef: MatDialogRef<ModalActualizarModeloCarreraComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
    dialogRef.disableClose = true;
    this.accion = obj.accion;
    this.datosCargados = true;
    this.dataModelo = this.fabrica(obj.data);
    this.dataModelo.estado === "1" ? this.isChecked :this.isChecked=false;
    
    this.accion === 'Modificar' ? this.subcriterioRepo.obtenerSubcriterioId(this.dataModelo.criterioid) : '';
    
    
  }

  ngOnInit(): void {
    this.obtenerData();
  }

  fabrica(data = {}) {
    return (Object.values(data)).length === 0 ? new ModeloCarrera() : { ...data };
  }



  obtenerData() {
    this.criterioRepo.obtenerCriterioActivoFecth();
    this.indicadorRepo.obtenerIndicadorActivoFecth();
    this.periodoRepo.obtenerPeriodoLectivoActivoFecth();    
  }

  get getmostrar() {
    return JSON.stringify(this.dataModelo)
  }

  
  seleccionarCriterio(data: any) {
    this.subcriterioRepo.obtenerSubcriterioId(data.value);
    // this.subcriterioRepo.obtenerSubcriterioUnicoId
    console.log(this.subcriterioRepo.obtenerSubcriterioUnicoId);
    
     
  }

  cerrarModal() {
    this.dialogRef.close({ event: "Cancel" });
  }

  enviarFormulario(form: NgForm) {
    this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.dataModelo };
      data.estado = this.dataModelo.estado? "1":"0";
      this.close.emit({ accion: this.accion, data });
    }
    this.bloquearBoton = false;
  }

}
