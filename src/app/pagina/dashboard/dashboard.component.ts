import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { MatSort } from '@angular/material/sort';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icCloudDownload from '@iconify/icons-ic/twotone-cloud-download';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import icFat from '@iconify/icons-ic/twotone-fact-check';
import icCalendar from '@iconify/icons-ic/twotone-calendar-today';
import icContentPaste from '@iconify/icons-ic/twotone-content-paste';
import icAccessAlarm from '@iconify/icons-ic/twotone-access-alarm';



@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  
  ELEMENT_DATA: any[] = [
    {estado_evidencia: true, modelo_carrera: 'Hydrogen', evaluador: 'Jessica Mendoza', fecha_evidencia: 'hace 3 horas' },
    {estado_evidencia: true, modelo_carrera: 'Helium', evaluador: 'Juana Pozo', fecha_evidencia: 'hace 30 min' },
    {estado_evidencia: false, modelo_carrera: 'Lithium', evaluador: 'Juana Pozo', fecha_evidencia: 'hace 6 horas' },
    {estado_evidencia: true, modelo_carrera: 'Beryllium', evaluador: 'Jessica Mendoza', fecha_evidencia: 'hace 1 min' },
    {estado_evidencia: true, modelo_carrera: 'Boron', evaluador: 'Jessica Mendoza', fecha_evidencia: 'hace 2 min' },
    {estado_evidencia: false, modelo_carrera: 'Carbon', evaluador: 'Juana Pozo', fecha_evidencia: 'hace 15 min' },
    {estado_evidencia: true, modelo_carrera: 'Nitrogen', evaluador: 'Jessica Mendoza', fecha_evidencia: 'hace 37 horas' },
    {estado_evidencia: true, modelo_carrera: 'Oxygen', evaluador: 'Jessica Mendoza', fecha_evidencia: 'hace 50 min' },
    {estado_evidencia: false, modelo_carrera: 'Fluorine', evaluador: 'Juana Pozo', fecha_evidencia: 'hace 3 horas' },
    {estado_evidencia: true, modelo_carrera: 'Neon', evaluador: 'Juana Pozo', fecha_evidencia: 'hace 6 horas' },
  ];
  rol: any;
  
  constructor(private urlService:UrlService) { }
  icMoreVert = icMoreVert;
  icFat = icFat;
  icCalendar = icCalendar;
  icContentPaste = icContentPaste;
  icAccessAlarm = icAccessAlarm;
  layoutCtrl = new FormControl('boxed');
  evaluaciones:any;
  periodos:any;
  criterios:any;
  indicadores:any;
  
  displayedColumns: string[] = ['estado_evidencias', 'modelo_carrera', 'evaluador','fecha_evidencia'];
  // dataSource = this.ELEMENT_DATA;
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('counter', { static: true }) counter: ElementRef;
  @Input() pageSize = 6;

  icMoreHoriz = icMoreHoriz;
  icCloudDownload = icCloudDownload;
  ngOnInit(): void {
    this.rol = JSON.parse(localStorage.getItem('usuario')).rolid;
  }

  ngAfterViewInit(){
    this.obtenerDatas()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }

 


  async obtenerDatas(){
    await this.urlService.contarEvaluacion().subscribe((data:any)=>{this.evaluaciones = data.datos[0].total;})
    await this.urlService.contarPeriodo().subscribe((data:any)=>{this.periodos = data.datos[0].total;})
    await this.urlService.contarCriterio().subscribe((data:any)=>{this.criterios = data.datos[0].total;})
    await this.urlService.contarIndicador().subscribe((data:any)=>{this.indicadores = data.datos[0].total;})
  }

}
