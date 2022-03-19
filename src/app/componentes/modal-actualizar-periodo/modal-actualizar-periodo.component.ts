import { Component, Inject, Optional, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { PeriodoLectivo } from 'src/app/modelos/periodo-lectivo/periodo-lectivo.models';



@Component({
  selector: 'vex-modal-actualizar-periodo',
  templateUrl: './modal-actualizar-periodo.component.html',
  styleUrls: ['./modal-actualizar-periodo.component.scss']
})
export class ModalActualizarPeriodoComponent{
  isChecked: boolean = true;
  accion: string;
  dataPeriodo: PeriodoLectivo;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  constructor(
    // public error: ErrorService,
    public dialogRef: MatDialogRef<ModalActualizarPeriodoComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {

    dialogRef.disableClose = true;
    this.accion = obj.accion;
    this.dataPeriodo = this.fabrica(obj.data);
    this.dataPeriodo.estado === "1" ? this.isChecked :this.isChecked=false;
  }
  
  fabrica(data = {}) {
    return (Object.values(data)).length === 0 ? new PeriodoLectivo() : { ...data };
  }

  get getmostrar() {
    return JSON.stringify(this.dataPeriodo)
  }

  cerrarModal() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  enviarFormulario(form: NgForm) {
 this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.dataPeriodo }
      data.estado = this.dataPeriodo.estado? "1":"0";
      this.close.emit({ accion: this.accion, data });
    }
  }


}

