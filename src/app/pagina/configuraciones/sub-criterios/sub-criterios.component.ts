import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import icSearch from '@iconify/icons-ic/twotone-search';
import { Subcriterio } from 'src/app/modelos/subcriterio/subcriterio.models';
import { FormControl } from '@angular/forms';
import { ModalActualizarSubcriterioComponent } from 'src/app/componentes/modal-actualizar-subcriterio/modal-actualizar-subcriterio.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { CriterioRepository } from 'src/app/repositorio/criterio/criterio.repository';
import { SubcriterioRepository } from 'src/app/repositorio/subcriterio/subcriterio.repository';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';

@Component({
  selector: 'vex-sub-criterios',
  templateUrl: './sub-criterios.component.html',
  styleUrls: ['./sub-criterios.component.scss']
})
export class SubCriteriosComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dialogRef: MatDialogRef<ModalActualizarSubcriterioComponent, any>;
  mostrarColumnas: string[] = ['num', 'criterio', 'estado', 'action'];
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
  constructor(public dialog: MatDialog, private snack: MensajeService, public criterioRepo: CriterioRepository, public subCriterioRepo: SubcriterioRepository) {
    // this.criterioRepo.obtenerCriterioFecth();
    this.subCriterioRepo.obtenerSubcriterioFecth();
  }

  ngOnInit(): void {
    this.obtenerData()
  }

  obtenerData() {
    this.subCriterioRepo.datosEmitir.subscribe((data: string) => {
      data === 'second' ? (this.cargando = false, this.datosCargados = true) : '';
      this.dataSource = new MatTableDataSource(this.subCriterioRepo.obtenerSubcriterios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(accion: string, data: Subcriterio) {

    if(accion === 'Modificar'){
      let valor: Subcriterio = Object.assign({},data)
      this.dialogRef = this.dialog.open(ModalActualizarSubcriterioComponent, {
        width: "600px",
        data: { accion, valor },
      });
    }else{
      this.dialogRef = this.dialog.open(ModalActualizarSubcriterioComponent, {
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
          this.registrarSubcriterio(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarSubcriterio(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarSubcriterio(result.data);
        }
      });
  }

  registrarSubcriterio(data: Subcriterio) {
    this.cargando = true
    this.subCriterioRepo.registrarSubcriterio(data).subscribe((data: any) => {
      data.ok
        ? (this.subCriterioRepo.obtenerSubcriterioFecth(), this.table.renderRows(), this.dialogRef.close())
        : (this.snack.openSnackBar(data.mensaje), this.dialogRef.componentInstance.bloquearBoton = false)
      this.cargando = false
      this.snack.openSnackBar(data.mensaje);
    }, error => {
      error.error.message === ''
        ? (this.snack.openSnackBar(error.error.message), this.cargando = true)
        : (this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.'), this.cargando = true)
    })
  }

  modificarSubcriterio(data: Subcriterio) {
    this.cargando = true;
    this.subCriterioRepo.modificarSubcriterio(data).subscribe((data: any) => {  
      data.ok 
        ? (this.subCriterioRepo.obtenerSubcriterioFecth(), this.table.renderRows(), this.dialogRef.close())
        : (this.snack.openSnackBar(data.mensaje), this.dialogRef.componentInstance.bloquearBoton = false)
    this.cargando = false
    this.snack.openSnackBar(data.mensaje);
    }, error => {
      error.error.message === ''
        ? (this.snack.openSnackBar(error.error.message), this.cargando = true)
        : (this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.'), this.cargando = true)
    })
  }

 eliminarSubcriterio(data: Subcriterio) {
    this.cargando = true;
    // this.criterioRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }


}
