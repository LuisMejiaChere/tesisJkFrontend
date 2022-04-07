import { Component, Inject, Optional, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { Subcriterio } from 'src/app/modelos/subcriterio/subcriterio.models';
import { CriterioRepository } from 'src/app/repositorio/criterio/criterio.repository';



@Component({
  selector: 'vex-modal-actualizar-subcriterio',
  templateUrl: './modal-actualizar-subcriterio.component.html',
  styleUrls: ['./modal-actualizar-subcriterio.component.scss']
})
export class ModalActualizarSubcriterioComponent {
  isChecked: boolean = true;
  accion: string;
  dataSubcriterio: Subcriterio;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  constructor(
    public criterioRepo: CriterioRepository,
    public dialogRef: MatDialogRef<ModalActualizarSubcriterioComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
    dialogRef.disableClose = true;
    this.accion = obj.accion;
    this.dataSubcriterio = this.fabrica(obj.data);
    this.dataSubcriterio.estado === "1" ? this.isChecked :this.isChecked=false;
  }

   ngOnInit(): void {
     this.criterioRepo.obtenerCriterioActivoFecth();  
     this.criterioRepo.obtenerCriterioFecth();  
    }
  
  fabrica(data = {}) {
    return (Object.values(data)).length === 0 ? new Subcriterio() : { ...data };
  }

  get getmostrar() {
    return JSON.stringify(this.dataSubcriterio)
  }

  cerrarModal() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  enviarFormulario(form: NgForm) {
    this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.dataSubcriterio }
      data.estado = this.dataSubcriterio.estado? "1":"0";
      this.close.emit({ accion: this.accion, data });
    }
  }



  // getDatos(): Subcriterio {
  //   const flag = this.dataSubcriterio.estado? "1":"0";
  //   return {
  //     id: this.dataSubcriterio.id,
  //     id_criterio: this.dataSubcriterio.id_criterio,
  //     subcriterio: this.dataSubcriterio.subcriterio,
  //     estado: flag
  //   };
  // }

}

