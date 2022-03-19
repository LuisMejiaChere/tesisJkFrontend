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
    this.dialogRef = this.dialog.open(ModalActualizarSubcriterioComponent, {
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
          this.registrarSubcriterio(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarSubcriterio(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarSubcriterio(result.data);
        }
      });
  }

 eliminarSubcriterio(data: Subcriterio) {
    this.cargando = true;
    // this.criterioRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }

  registrarSubcriterio(data: Subcriterio) {
    this.subCriterioRepo.registrarSubcriterio(data).subscribe(this.controlador, this.errores);
  }

  modificarSubcriterio(data: Subcriterio) {
    this.subCriterioRepo.modificarSubcriterio(data).subscribe(this.controlador, this.errores);
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
