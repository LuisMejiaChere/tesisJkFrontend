import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icFolderZip from '@iconify/icons-ic/twotone-folder-zip';

import faFilePdf from '@iconify/icons-fa-solid/file-pdf';
import faFileXls from '@iconify/icons-fa-solid/file-excel'


import icSearch from '@iconify/icons-ic/twotone-search';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icImportExport from '@iconify/icons-ic/twotone-import-export';



import icbaselinetextsnippet from '@iconify/icons-ic/baseline-text-snippet';

import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { ModalActualizarModeloCarreraComponent } from 'src/app/componentes/modal-actualizar-modelo-carrera/modal-actualizar-modelo-carrera.component';
import { ModeloCarreraRepository } from 'src/app/repositorio/modelo-carrera/modelo-carrera.repository';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ModeloCarrera } from 'src/app/modelos/modelo-carrera/modelo-carrera.models';


import { ModalActualizarEvidenciaComponent } from 'src/app/componentes/modal-actualizar-evidencia/modal-actualizar-evidencia.component';

import { PageReference, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import * as XLSX from 'xlsx/dist/xlsx.full.min.js';
import { UrlService } from 'src/app/servicios/url/url.service';
import { HttpClient, HttpEvent, HttpHeaderResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Workbook } from 'exceljs';
import * as fs from 'file-saver';



// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);


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
  icImportExport = icImportExport;
  icArrowDropDown =icArrowDropDown;
  faFilePdf = faFilePdf;
  faFileXls = faFileXls;
  icAttachFile = icAttachFile;
  icMoreVert = icMoreVert;
  icDelete = icDelete;
  icEdit = icEdit;
  icFolderZip = icFolderZip;
  icbaselinetextsnippet = icbaselinetextsnippet;
  datosCargados = false;
  isDisabled = false;
  cargando = true;
  dialogSubmitSubscription: any;
  searchCtrl = new FormControl();

  constructor(private http: HttpClient, public urlService:UrlService, public dialog: MatDialog, private snack: MensajeService, public modeloCarreraRepo: ModeloCarreraRepository) {
    this.modeloCarreraRepo.obtenerModeloCarreraFecth();
    this.modeloCarreraRepo.obtenerModeloCarreraActivoFecth()
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
      this.modeloCarreraRepo.obtenerModeloCarreraActivoFecth()
    }
    this.snack.openSnackBar(data.mensaje);
    this.dialogRef.close();
    this.modeloCarreraRepo.obtenerModeloCarreraActivoFecth()
    
  }
  
  errores = (data: any) => {
    this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
    this.dialogRef.close();
  }


  async crearReporte(){
    const pdf = new PdfMakeWrapper();
    const data =  await this.fetchData();
    if (this.extraerData(data).length > 0) {
      this.configPdf(pdf)
      pdf.add(this.createFilas(data)); 
      pdf.create().open();
      this.snack.openSnackBar('Reporte de modelos de carrera creado correctamente.');
  } else {
     this.snack.openSnackBar('No se encontraron registros');
  }
  }

  createFilas(data: any):ITable{
    return new Table([
      ['ID', 'CRITERIO', 'SUBCRITERIO', 'N DE INDICADOR', 'INDICADORES', 'TIPO', 'DESCRIPCIÓN ESTANDAR DEL INDICADOR', 'ELEMENTO FUNDAMENTAL'],
      ...this.extraerData(data)
    ])
    .layout({
      fillColor:(rowIndex: number, node:any, columnIndex: number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      }})
    .end
  }

  extraerData(data:any): any{
    return data.map(row =>[row.id, row.criterio, row.subcriterio, row.indicadorid, row.indicador, row.tipo, row.descripcion, row.elementofundamental])
  }

   fetchData(){
    this.modeloCarreraRepo.obtenerModeloCarreraActivoFecth()
    const data = this.modeloCarreraRepo.obtenerModelosCarrerasActivo
    return data
  }

  configPdf(pdf){
    pdf.header({text:'Modelo genérico de evaluación del entorno de aprendizaje de carreras en ecuador', bold: true, alignment: 'center', italics: true, margin: [ 5, 10, 10, 20 ]  })
    pdf.pageOrientation('landscape'); // 'portrait'
    pdf.pageSize('A4');
    pdf.info({
      title: 'Modelo genérico de evaluación del entorno de aprendizaje de carreras en ecuador',
      author: 'Facultad de Ciencias Informatcas',
  });
  pdf.watermark( new Txt('marca de agua con color azul').color('blue').end );

  }

  
async excel(){
  this.modeloCarreraRepo.obtenerModeloCarreraActivoFecth()
  const data = this.modeloCarreraRepo.obtenerModelosCarrerasActivo
  if (this.extraerData(data).length > 0) {
  const encabezados = ['ID', 'CRITERIO', 'SUBCRITERIO', 'N DE INDICADOR', 'INDICADORES', 'TIPO', 'DESCRIPCIÓN ESTANDAR DEL INDICADOR', 'ELEMENTO FUNDAMENTAL']
  const title = 'Modelo genérico de evaluación del entorno de aprendizaje de carreras en ecuador';
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Modelo de carrera');
  const titleRow = worksheet.addRow([title]);
  titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
  titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.addRow([]);
  worksheet.mergeCells('A1:H2');
  worksheet.addRow([]);
  const headerRow = worksheet.addRow(encabezados);
      // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    XLSX.utils.json_to_sheet(this.extraerData(data), {origin: 'A2', cellStyles: true});

    // Add Data and Conditional Formatting
    this.extraerData(data).forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999';
      }
    
      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    }
    
    );
    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 40;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 40;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 40;
    worksheet.getColumn(8).width = 40;
    worksheet.addRow([]);


// Footer Row
    const footerRow = worksheet.addRow(['Esta es una hoja de Excel generada por el sistema.']);
    footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);


  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'Modelo_Autoevaluación_de_Carrera.xlsx');
  });
  this.snack.openSnackBar('Reporte de modelos de carrera creado correctamente.');
  } else {
    this.snack.openSnackBar('No se encontraron registros');
  }

}




crearComprimido(id) {

  this.urlService.obtenerEvidenciasModeloCarrerabyId(id).subscribe((res:any)=>{
    if(res.estado){
      // Evidencia/evidencias_comprimir_zip?id=${data.id}
      const url = `http://188.166.96.154/backend.tesis.jk/docs/comprimidos/${res.datos.ruta}`
      // window.open(url);
      window.saveAs(url);
    }
    console.log(res);
    
  })
  
}

}
