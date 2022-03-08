import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import icSearch from '@iconify/icons-ic/twotone-search';
import { FormControl } from '@angular/forms';
import { ModalActualizarPeriodoComponent } from 'src/app/componentes/modal-actualizar-periodo/modal-actualizar-periodo.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { PeriodoLectivoRepository } from 'src/app/repositorio/periodo-lectivo/periodo-lectivo.repository';
import { CriteriosI } from 'src/app/interface/interfaces.interface';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { PeriodoLectivo } from 'src/app/modelos/periodo-lectivo/periodo-lectivo.models';

@Component({
  selector: 'vex-periodo-lectivo',
  templateUrl: './periodo-lectivo.component.html',
  styleUrls: ['./periodo-lectivo.component.scss']
})
export class PeriodoLectivoComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dialogRef: MatDialogRef<ModalActualizarPeriodoComponent, any>;
  mostrarColumnas: string[] = ['num', 'periodo', 'estado', 'action'];
  dataSource = null;
  icSearch = icSearch;
  icMoreVert = icMoreVert;
  icDelete = icDelete;
  icEdit = icEdit;
  datosCargados = false;
  isDisabled = false;
  cargando = true;
  dialogSubmitSubscription: any;
  searchCtrl = new FormControl();
  constructor(public dialog: MatDialog, private snack: MensajeService, public periodoRepo: PeriodoLectivoRepository) {
    this.periodoRepo.obtenerPeriodoLectivoFecth();
  }

  ngOnInit(): void {
    this.obtenerData()
  }

  obtenerData() {
    this.periodoRepo.datosEmitir.subscribe((data: string) => {
      data === 'second' ? (this.cargando = false, this.datosCargados = true) : '';
      this.dataSource = new MatTableDataSource(this.periodoRepo.obtenerPeriodos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(accion: string, data: PeriodoLectivo) {
    if(accion === 'Modificar'){
      let valor: PeriodoLectivo = Object.assign({},data)
      this.dialogRef = this.dialog.open(ModalActualizarPeriodoComponent, {
        width: "600px",
        data: { accion, valor },
      });
    }else{
      this.dialogRef = this.dialog.open(ModalActualizarPeriodoComponent, {
        width: "600px",
        data: { accion, data },
      });
    }
 
    if (this.dialogSubmitSubscription) {
      this.dialogSubmitSubscription.unsubscribe();
    }

    this.dialogSubmitSubscription = this.dialogRef.componentInstance.close
      .subscribe(result => {

        if (result === undefined) { return; }

        if (result.accion === 'Registrar') {
          this.registrarPeriodo(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarPeriodo(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarPeriodo(result.data);
        }
      });
  }

  registrarPeriodo(data: PeriodoLectivo) {
    this.cargando = true
    this.periodoRepo.registrarPeriodo(data).subscribe((data: any) => {
      console.log(data);
      data.ok
        ? (this.periodoRepo.obtenerPeriodoLectivoFecth(), this.table.renderRows(), this.dialogRef.close())
        : (this.snack.openSnackBar(data.mensaje), this.dialogRef.componentInstance.bloquearBoton = false)
      this.cargando = false
      this.snack.openSnackBar(data.mensaje);
    }, error => {
      console.log(error);
      error.error.message === ''
        ? (this.snack.openSnackBar(error.error.message), this.cargando = true)
        : (this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.'), this.cargando = true)
    })
  }

  modificarPeriodo(data: PeriodoLectivo) {
    this.cargando = true;
    this.periodoRepo.modificarPeriodo(data).subscribe((data: any) => {  
      console.log(data);
      data.ok 
        ? (this.periodoRepo.obtenerPeriodoLectivoFecth(), this.table.renderRows(), this.dialogRef.close())
        : (this.snack.openSnackBar(data.mensaje), this.dialogRef.componentInstance.bloquearBoton = false)
    this.cargando = false
    this.snack.openSnackBar(data.mensaje);
    }, error => {
      console.log(error);
      
      error.error.message === ''
        ? (this.snack.openSnackBar(error.error.message), this.cargando = true)
        : (this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.'), this.cargando = true)
    })
  }

 eliminarPeriodo(data: PeriodoLectivo) {
    this.cargando = true;
    // this.periodoRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }


}
