import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import icSearch from "@iconify/icons-ic/twotone-search";
import { Indicador } from "src/app/modelos/indicador/indicador.models";
import { FormControl } from "@angular/forms";
import { ModalActualizarIndicadorComponent } from "src/app/componentes/modal-actualizar-indicador/modal-actualizar-indicador.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { IndicadorRepository } from "src/app/repositorio/indicador/indicador.repository";
import { MensajeService } from "src/app/servicios/mensajes/mensaje.service";

@Component({
  selector: "vex-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.scss"],
})
export class IndicadoresComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dialogRef: MatDialogRef<ModalActualizarIndicadorComponent, any>;
  mostrarColumnas: string[] = ["num", "indicador", "descripcion","estado", "action"];
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
  constructor(
    public dialog: MatDialog,
    private snack: MensajeService,
    public indicadorRepo: IndicadorRepository
  ) {
    this.indicadorRepo.obtenerIndicadorFecth();
  }

  ngOnInit(): void {
    this.obtenerData();
  }

  obtenerData() {
    this.indicadorRepo.datosEmitir.subscribe((data: string) => {
      data === "second"
        ? ((this.cargando = false), (this.datosCargados = true))
        : "";
      this.dataSource = new MatTableDataSource(
        this.indicadorRepo.obtenerIndicadores
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(accion: string, data: Indicador) {
    if(accion === 'Modificar'){
      let valor: Indicador = Object.assign({},data)
      this.dialogRef = this.dialog.open(ModalActualizarIndicadorComponent, {
        width: "600px",
        data: { accion, valor },
      });
    }else{
      this.dialogRef = this.dialog.open(ModalActualizarIndicadorComponent, {
        width: "600px",
        data: { accion, data },
      });
    }
  
    if (this.dialogSubmitSubscription) {
      this.dialogSubmitSubscription.unsubscribe();
    }

    this.dialogSubmitSubscription =
      this.dialogRef.componentInstance.close.subscribe((result) => {
        if (result === undefined) {
          return;
        }

        if (result.accion === "Registrar") {
          this.registrarIndicador(result.data);
        } else if (result.accion === "Modificar") {
          this.modificarIndicador(result.data);
        } else if (result.accion === "Eliminar") {
          this.eliminarIndicador(result.data);
        }
      });
  }

  registrarIndicador(data: Indicador) {
    this.cargando = true;
    this.indicadorRepo.registrarIndicador(data).subscribe(
      (data: any) => {
        console.log(data);
      data.ok
        ? (this.indicadorRepo.obtenerIndicadorFecth(), this.table.renderRows(), this.dialogRef.close())
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

  modificarIndicador(data: Indicador) {
    this.cargando = true;
    this.indicadorRepo.modificarIndicador(data).subscribe((data: any) => {  
      console.log(data);
      data.ok 
        ? (this.indicadorRepo.obtenerIndicadorFecth(), this.table.renderRows(), this.dialogRef.close())
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

  eliminarIndicador(data: Indicador) {
    this.cargando = true;
    // this.indicadorRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }
}
