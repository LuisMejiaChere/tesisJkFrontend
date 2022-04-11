import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import icSearch from '@iconify/icons-ic/twotone-search';
import { Subcriterio } from 'src/app/modelos/subcriterio/subcriterio.models';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icAdd from '@iconify/icons-ic/twotone-add';


import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { ModalActualizarEvaluadorComponent } from 'src/app/componentes/modal-actualizar-evaluador/modal-actualizar-evaluador.component';
import { EvaluadorRepository } from 'src/app/repositorio/evaluador/evaluador.repository';
import { Evaluador } from 'src/app/modelos/evaluador/evaluador.models';

@Component({
  selector: 'vex-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.scss']
})
export class EvaluadorComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dialogRef: MatDialogRef<ModalActualizarEvaluadorComponent, any>;
  mostrarColumnas: string[] = ['num', 'nombres','correo', 'estado', 'action'];
  dataSource = null;
  icSearch = icSearch;
  icMoreVert = icMoreVert;
  icDelete = icDelete;
  icEdit = icEdit;
  icAdd = icAdd;
  datosCargados = false;
  isDisabled = false;
  cargando = true;
  dialogSubmitSubscription: any;
  searchCtrl = new FormControl();
  constructor(public dialog: MatDialog, private snack: MensajeService, public evaluadorRepo: EvaluadorRepository) {
    // this.criterioRepo.obtenerCriterioFecth();
    this.evaluadorRepo.obtenerEvaluadorFecth();
  }

  ngOnInit(): void {
    this.obtenerData()
  }

  obtenerData() {
    this.evaluadorRepo.datosEmitir.subscribe((data: string) => {
      data === 'second' ? (this.cargando = false, this.datosCargados = true) : '';
      this.dataSource = new MatTableDataSource(this.evaluadorRepo.obtenerEvaluadores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(accion: string, data: Subcriterio) {
    this.dialogRef = this.dialog.open(ModalActualizarEvaluadorComponent, {
      width: "600px",
      data: { accion, data },
    });

    if (this.dialogSubmitSubscription) {
      this.dialogSubmitSubscription.unsubscribe();
    }

    this.dialogSubmitSubscription = this.dialogRef.componentInstance.close
      .subscribe(result => {
        if (result === undefined) { return; }
        if (result.accion === 'Registrar') {
          this.registrarEvaluador(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarEvaluador(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarSubcriterio(result.data);
        }
      });
  }

 eliminarSubcriterio(data: Evaluador) {
    this.cargando = true;
    // this.criterioRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }

  registrarEvaluador(data: Evaluador) {
    this.evaluadorRepo.registrarEvaluador(data).subscribe(this.controlador, this.errores);
  }

  modificarEvaluador(data: Evaluador) {
    this.evaluadorRepo.modificarEvaluador(data).subscribe(this.controlador, this.errores);
  }

  controlador = (data: any) => {
    if (data.ok) {
      this.table.renderRows();
    }
    this.snack.openSnackBar(data.mensaje);
    this.dialogRef.close();
  }
  
  errores = (data: any) => {
    this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
    this.dialogRef.close();
  }


}
