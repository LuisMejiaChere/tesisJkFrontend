import { Component, Inject, Optional, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { Criterio } from 'src/app/modelos/criterio/criterio.models';



@Component({
  selector: 'vex-modal-actualizar-criterio',
  templateUrl: './modal-actualizar-criterio.component.html',
  styleUrls: ['./modal-actualizar-criterio.component.scss']
})
export class ModalActualizarCriterioComponent {
  accion: string;
  isChecked = true;
  dataCriterio: Criterio;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  constructor(
    // public error: ErrorService,
    public dialogRef: MatDialogRef<ModalActualizarCriterioComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
    dialogRef.disableClose = true;
    
    this.accion = obj.accion;
    this.dataCriterio = this.fabrica(obj.data);
    this.dataCriterio.estado === "1" ? this.isChecked:this.isChecked=false;
  }
  
  fabrica(data = {}) {
    return (Object.values(data)).length === 0 ? new Criterio() : { ...data };
  }

  get getmostrar() {
    return JSON.stringify(this.dataCriterio)
  }

  cerrarModal() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  enviarFormulario(form: NgForm) {
  
    this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.dataCriterio }
      data.estado = this.dataCriterio.estado? "1":"0";
      this.close.emit({ accion: this.accion, data });
    }
    this.bloquearBoton = false;
  }


}

