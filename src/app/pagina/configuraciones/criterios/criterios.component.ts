import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import icSearch from '@iconify/icons-ic/twotone-search';
import { Criterio } from 'src/app/modelos/criterio/criterio.models';
import { FormControl } from '@angular/forms';
import { ModalActualizarCriterioComponent } from 'src/app/componentes/modal-actualizar-criterio/modal-actualizar-criterio.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { CriterioRepository } from 'src/app/repositorio/criterio/criterio.repository';
import icAdd from '@iconify/icons-ic/twotone-add';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';

@Component({
  selector: 'vex-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.scss']
})
export class CriteriosComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dialogRef: MatDialogRef<ModalActualizarCriterioComponent, any>;
  mostrarColumnas: string[] = ['num', 'criterio', 'estado', 'action'];
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
  constructor(public dialog: MatDialog, private snack: MensajeService, public criterioRepo: CriterioRepository) {
    this.criterioRepo.obtenerCriterioFecth();
  }

  ngOnInit(): void {
    this.obtenerData()
  }

  obtenerData() {
    this.criterioRepo.datosEmitir.subscribe((data: string) => {
      data === 'second' ? (this.cargando = false, this.datosCargados = true) : '';
      this.dataSource = new MatTableDataSource(this.criterioRepo.obtenerCriterios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(accion: string, data: Criterio) {
    this.dialogRef = this.dialog.open(ModalActualizarCriterioComponent, {
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
          this.registrarCriterio(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarCriterio(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarCriterio(result.data);
        }
      });
  }

  eliminarCriterio(data: Criterio) {
    this.cargando = true;
    // this.criterioRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }

  registrarCriterio(data: Criterio) {
    this.criterioRepo.registrarCriterio(data).subscribe(this.controlador, this.errores);
  }

  modificarCriterio(data: Criterio) {
    this.criterioRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
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
