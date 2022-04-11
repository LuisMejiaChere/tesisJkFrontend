import { Component, Inject, Optional, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { Evaluador } from 'src/app/modelos/evaluador/evaluador.models';

@Component({
  selector: 'vex-modal-actualizar-evaluador',
  templateUrl: './modal-actualizar-evaluador.component.html',
  styleUrls: ['./modal-actualizar-evaluador.component.scss']
})
export class ModalActualizarEvaluadorComponent {
  accion: string;
  isChecked = true;
  dataEvaluador: Evaluador;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  constructor(
    // public error: ErrorService,
    public dialogRef: MatDialogRef<ModalActualizarEvaluadorComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
    dialogRef.disableClose = true;
    
    this.accion = obj.accion;
    this.dataEvaluador = this.fabrica(obj.data);
    this.dataEvaluador.estado === "1" ? this.isChecked:this.isChecked=false;
  }
  
  fabrica(data = {}) {
    return (Object.values(data)).length === 0 ? new Evaluador() : { ...data };
  }

  get getmostrar() {
    return JSON.stringify(this.dataEvaluador)
  }

  cerrarModal() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  enviarFormulario(form: NgForm) {
  
    this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.dataEvaluador }
      data.estado = this.dataEvaluador.estado? "1":"0";
      data.contraseña = this.dataEvaluador.cedula;
      this.close.emit({ accion: this.accion, data });
    }
    this.bloquearBoton = false;
  }


}

