import {
  Component,
  Inject,
  Optional,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import { Indicador } from "src/app/modelos/indicador/indicador.models";

@Component({
  selector: "vex-modal-actualizar-indicador",
  templateUrl: "./modal-actualizar-indicador.component.html",
  styleUrls: ["./modal-actualizar-indicador.component.scss"],
})
export class ModalActualizarIndicadorComponent {
  isChecked = true;
  accion: string;
  dataIndicador: Indicador;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  constructor(
    // public error: ErrorService,
    public dialogRef: MatDialogRef<ModalActualizarIndicadorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public obj
  ) {
    dialogRef.disableClose = true;
    this.accion = obj.accion;
    // console.log(obj);
    if(this.accion === 'Modificar'){
      this.dataIndicador = obj.valor;
    }else{
      this.dataIndicador = obj.data;
    }
    this.dataIndicador.estado === "1" ? this.isChecked :this.isChecked=false;
  }


  get getmostrar() {
    return JSON.stringify(this.dataIndicador);
  }

  cerrarModal() {
    this.dialogRef.close({ event: "Cancel" });
  }

  enviarFormulario(form: NgForm) {
    this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.getDatos() };
      this.close.emit({ accion: this.accion, data });
    }
    this.bloquearBoton = false;
  }

  getDatos(): Indicador {
    const flag = this.dataIndicador.estado ? "1":"0";
    return {
      id_indicador: this.dataIndicador.id_indicador,
      id_tipo: this.dataIndicador.id_tipo,
      indicador: this.dataIndicador.indicador,
      descripcion: this.dataIndicador.descripcion,
      estado: flag,
    };
  }
  ge
}
