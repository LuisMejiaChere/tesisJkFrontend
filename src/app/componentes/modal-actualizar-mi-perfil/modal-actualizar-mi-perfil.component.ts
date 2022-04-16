import { Component, Inject, Optional, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { Evaluador } from 'src/app/modelos/evaluador/evaluador.models';

@Component({
  selector: 'vex-modal-actualizar-mi-perfil',
  templateUrl: './modal-actualizar-mi-perfil.component.html',
  styleUrls: ['./modal-actualizar-mi-perfil.component.scss']
})
export class ModalActualizarMiPerfilComponent {
  accion: string;
  isChecked = true;
  dataEvaluador: Evaluador;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  rol: any;
  disabled
  constructor(
    // public error: ErrorService,
    public dialogRef: MatDialogRef<ModalActualizarMiPerfilComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
    dialogRef.disableClose = true;
    
    this.accion = obj.accion;
    this.dataEvaluador = this.fabrica(obj.data);
    // console.log(this.dataEvaluador);
    
    this.dataEvaluador.estado === "1" ? this.isChecked:this.isChecked=false;
    this.rol = JSON.parse(localStorage.getItem('usuario')).rolid;
    this.rol === '1' ? this.disabled = false : this.disabled = true;
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
      data.password = this.dataEvaluador.password;
      // data.rolid = '2';
      this.close.emit({ accion: this.accion, data });
    }
    this.bloquearBoton = false;
  }


}

