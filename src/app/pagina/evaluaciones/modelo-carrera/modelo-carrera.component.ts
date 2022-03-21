import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';


import icSearch from '@iconify/icons-ic/twotone-search';
import icbaselinetextsnippet from '@iconify/icons-ic/baseline-text-snippet';

import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { ModalActualizarModeloCarreraComponent } from 'src/app/componentes/modal-actualizar-modelo-carrera/modal-actualizar-modelo-carrera.component';
import { ModeloCarreraRepository } from 'src/app/repositorio/modelo-carrera/modelo-carrera.repository';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ModeloCarrera } from 'src/app/modelos/modelo-carrera/modelo-carrera.models';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ModalActualizarEvidenciaComponent } from 'src/app/componentes/modal-actualizar-evidencia/modal-actualizar-evidencia.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'vex-modelo-carrera',
  templateUrl: './modelo-carrera.component.html',
  styleUrls: ['./modelo-carrera.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ModeloCarreraComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dialogRef: MatDialogRef<ModalActualizarModeloCarreraComponent, any>;
  dialogRefEvidencia: MatDialogRef<ModalActualizarEvidenciaComponent, any>;
  columnsToDisplay : string[] =  ['num', 'elementoFundamental','estado', 'action'];
  // mostrarColumnas: string[] = ['num', 'criterio', 'subcriterio', 'indicador', 'tipo', 'descripcion', 'elemento_fundamental', 'estado', 'action'];
  expandedElement: any | null;
  dataSource = null;
  icSearch = icSearch;
  icAttachFile = icAttachFile;
  icMoreVert = icMoreVert;
  icDelete = icDelete;
  icEdit = icEdit;
  icbaselinetextsnippet = icbaselinetextsnippet;
  datosCargados = false;
  isDisabled = false;
  cargando = true;
  dialogSubmitSubscription: any;
  searchCtrl = new FormControl();



  constructor(public dialog: MatDialog, private snack: MensajeService, public modeloCarreraRepo: ModeloCarreraRepository) {
    this.modeloCarreraRepo.obtenerModeloCarreraFecth();
  }
  ngOnInit(): void {
    this.obtenerData()
  }

  obtenerData() {
    this.modeloCarreraRepo.datosEmitir.subscribe((data: string) => {
      data === 'second' ? (this.cargando = false, this.datosCargados = true) : '';
      this.dataSource = new MatTableDataSource(this.modeloCarreraRepo.obtenerModelosCarreras);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog(accion: string, data: ModeloCarrera) {
    this.dialogRef = this.dialog.open(ModalActualizarModeloCarreraComponent, {
      data: { accion, data },
    });

    if (this.dialogSubmitSubscription) {
      this.dialogSubmitSubscription.unsubscribe();
    }

    this.dialogSubmitSubscription = this.dialogRef.componentInstance.close
      .subscribe(result => {
       
        if (result === undefined) { return; }

        if (result.accion === 'Registrar') {
          this.registrarModeloCarrera(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarModeloCarrera(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarModeloCarrera(result.data);
        }
      });
  }


  openDialogEvicendia(accion: string, data: ModeloCarrera) {
    this.dialogRefEvidencia = this.dialog.open(ModalActualizarEvidenciaComponent, {
      // height: '1024px',
      // width: '1024px',
    
      data: { accion, data },
    });

    if (this.dialogSubmitSubscription) {
      this.dialogSubmitSubscription.unsubscribe();
    }

    this.dialogSubmitSubscription = this.dialogRefEvidencia.componentInstance.close
      .subscribe(result => {
       
        if (result === undefined) { return; }

        if (result.accion === 'Registrar') {
          this.registrarModeloCarrera(result.data);
        } else if (result.accion === 'Modificar') {
          this.modificarModeloCarrera(result.data);
        } else if (result.accion === 'Eliminar') {
          this.eliminarModeloCarrera(result.data);
        }
      });
  }

  eliminarModeloCarrera(data: ModeloCarrera) {
    this.cargando = true;
    // this.criterioRepo.modificarCriterio(data).subscribe(this.controlador, this.errores);
  }

  registrarModeloCarrera(data: ModeloCarrera) {
    this.modeloCarreraRepo.registrarModeloCarrera(data).subscribe(this.controlador, this.errores);
  }

  modificarModeloCarrera(data: ModeloCarrera) {
    this.modeloCarreraRepo.modificarModeloCarrera(data).subscribe(this.controlador, this.errores);
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

  createPDF(data) {
    
    const pdfDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) { 
        return [currentPage.toString() + ' de ' + pageCount] 
      },
      header: function (currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element

        return [
          { text: 'Modelo genérico de evaluación del entorno de aprendizaje de carreras en ecuador', style: 'sectionHeader', bold: true, alignment: 'center' },
          { canvas: [{ type: 'rect', x: 170, y: 2, w: pageSize.width - 170, h: 40 }] }
        ]
      },
      defaultStyle: {  
        sectionHeader: {  
            bold: true,  
            decoration: 'underline',  
            fontSize: 14,  
            margin: [0, 15, 0, 15]  
        }  
      } ,
      content: [
        {
          pageMargins: [40, 60, 40, 60],
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Criterio', bold: true }, { text: 'Subcriterio', bold: true }, { text: 'Indicadores', bold: true }, { text: 'Tipo', bold: true }, { text: 'Descripción estándar del indicador', bold: true }, { text: 'Elemento fundamental', bold: true }, { text: 'Evidencias', bold: true }],
              [data.criterio, data.subcriterio, data.indicador, data.tipo, data.descripcion, data.elemento_fundamental, true],
            ]
          }
        }
      ]
    };

    /*
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo',
        }
      ]
    };*/

    const tableLayouts = {
      exampleLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 0;
          }
          return (i === node.table.headerRows) ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 0;
        },
        hLineColor: function (i) {
          return i === 1 ? 'black' : '#aaa';
        },
        paddingLeft: function (i) {
          return i === 0 ? 0 : 8;
        },
        paddingRight: function (i, node) {
          return (i === node.table.widths.length - 1) ? 0 : 8;
        }
      }
    };

    
    const pdf = pdfMake.createPdf(pdfDefinition, tableLayouts);
    pdf.open();

  }

}
