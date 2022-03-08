import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { ModeloCarrera } from 'src/app/modelos/modelo-carrera/modelo-carrera.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icUpload from '@iconify/icons-ic/twotone-drive-folder-upload';
import icClose from '@iconify/icons-ic/twotone-close';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icAdd from '@iconify/icons-ic/twotone-add';

import { NgForm } from '@angular/forms';
import { CriterioRepository } from 'src/app/repositorio/criterio/criterio.repository';
import { SubcriterioRepository } from 'src/app/repositorio/subcriterio/subcriterio.repository';
import { IndicadorRepository } from 'src/app/repositorio/indicador/indicador.repository';
import { PeriodoLectivoRepository } from 'src/app/repositorio/periodo-lectivo/periodo-lectivo.repository';

import  * as myGlobals  from 'src/app/globals';
import { ToolbarNotificationsModule } from 'src/@vex/layout/toolbar/toolbar-notifications/toolbar-notifications.module';



@Component({
  selector: 'vex-modal-actualizar-modelo-carrera',
  templateUrl: './modal-actualizar-modelo-carrera.component.html',
  styleUrls: ['./modal-actualizar-modelo-carrera.component.scss']
})
export class ModalActualizarModeloCarreraComponent implements OnInit {
  @ViewChild('inputFile') inputFile;
  archivos = [];
  archivosModificado = [];
  archivosTodos = [];
  archivoAux = [];
  extensiones = ['js', 'php', 'image/gif'];
  disabled
  public imagePath;
  imgURL: any;
  isChecked = true;
  isEvidencias = false;
  accion: string;
  dataPeriodo: any;
  dataModelo: any;
  public message: string;
  datosCargados = false;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  icDelete = icDelete;
  icUpload = icUpload;
  icAdd = icAdd;

  constructor(public criterioRepo: CriterioRepository, public periodoRepo: PeriodoLectivoRepository, public indicadorRepo: IndicadorRepository, public subcriterioRepo: SubcriterioRepository, public dialogRef: MatDialogRef<ModalActualizarModeloCarreraComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
    dialogRef.disableClose = true;
    this.accion = obj.accion;
    this.datosCargados = true;
    if (this.accion === 'Modificar') {
      this.dataModelo = obj.valor;
    } else {
      this.dataModelo = obj.data;
    }
    this.dataModelo.estado === "1" ? this.isChecked :this.isChecked=false;
    
  }

  ngOnInit(): void {
    this.obtenerData();
  }



  obtenerData() {
    this.criterioRepo.obtenerCriterioActivoFecth();
    this.indicadorRepo.obtenerIndicadorActivoFecth();
    this.periodoRepo.obtenerPeriodoLectivoActivoFecth();    
  }

  get getmostrar() {
    return JSON.stringify(this.dataModelo)
  }

  cerrarModal() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  enviarFormulario(data) {
    console.log(data);
    
    this.formularioEnviado = true;
      this.bloquearBoton = true;
      this.close.emit({ accion: this.accion, data });
    }
    // this.formularioEnviado = true;
    // if (form.valid) {
    //   this.bloquearBoton = true;
    //   const data = { ...this.data}
    //   console.log(data);

    //   this.close.emit({ accion: this.accion, data });
    // }

  // seleccionar selects

  seleccionarCriterio(data: any) {
    this.subcriterioRepo.obtenerSubcriterioId(data.value);
    this.subcriterioRepo.obtenerSubcriterios
  }

  getDatos(): ModeloCarrera {
    const flag = this.dataModelo.estado ? "1":"0";
    return {
      id_modelo: this.dataModelo.id_modelo,
      id_indicador: this.dataModelo.id_indicador,
      id_subcriterio: this.dataModelo.id_subcriterio,
      documento: this.archivosTodos,
      id_periodo: this.dataModelo.id_periodo,
      estado: flag,
      elemento_fundamental: this.dataModelo.elemento_fundamental,
    };
  }

  

  clickAgregarArchivo() {
    this.inputFile.nativeElement.click();
  }

  cargarArchivos(e) {
    console.log(e);
    this.add(Object.values(e.target.files));
    // this.encontrarErrorsArchivos();
    this.actualizarLista();
    e.target.value = '';
    // this.validarTamanio();
  }

  add(archivo) {
    console.log(archivo);
    
    this.archivos.push(...this.validar(this.convertir(archivo)));
    this.archivoAux = archivo;
  }
  
  convertir(archivos = []) {
    return archivos.map( archivo => { archivo.id = new Date().toISOString() + archivo.name;
                                      archivo.sube = true ; archivo.clase = 'adjunto-target'; return archivo;} );
  }

  validar(archivos = []) {
    return archivos.map( archivo => { this.extensiones.indexOf(archivo.type) !== -1 ? archivo.sube = false : ""; return archivo; })
  }

  clickQuitarArchivo(file) {
    console.log( this.archivosTodos);
    this.removeItemFromArr( this.archivosTodos, file );
    this.actualizarLista();
  }

  removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
  };

  actualizarLista() {
    this.setArchivosTodos();
  }

  setArchivosTodos() {
    this.archivosTodos = [...this.archivos];
  }

  SubirArchivos() {
  
    return new Promise((exito, fallo) => {
      // const data = { ...this.getDatos() }
      const { id_periodo, id_subcriterio, id_indicador,
        elemento_fundamental, estado, documento} = this.getDatos();

        const PROTOCOL = "http";
        const HOST = myGlobals.BASE_API_URL + "/backend.tesis.jk/Modelo_carrera/insertarModelo_carrera" || location.hostname;
        //const HOST = "192.168.100.78/backend.tesis.jk/Modelo_carrera/insertarModelo_carrera" || location.hostname;


      //const URL = `${PROTOCOL}://${HOST}/`;
      const URL = `${PROTOCOL}://${HOST}/`;
      // 'https://app.elize.com.ec/api_archivos_estudiantes';
      // const URL = 'https://test.app.elize.com.ec/api_archivos_estudiantes';
      const xhr = new XMLHttpRequest();
      const form = new FormData();

      documento.forEach(el => form.append('documento', el));
      form.append('id_periodo', id_periodo)
      form.append('id_subcriterio', id_subcriterio)
      form.append('id_indicador', id_indicador)
      form.append('elemento_fundamental', elemento_fundamental)
      form.append('estado', estado);

      console.log(form);
      

      xhr.onreadystatechange = () => {
        xhr.readyState === 4
          ? xhr.status === 200
            ? (exito(JSON.parse(xhr.response)), this.enviarFormulario(JSON.parse(xhr.response)) )
            : fallo(xhr.response)
          : ' '
    };

      xhr.open('POST', URL, true)
      let data = xhr.send(form)
      console.log(data);
      

    });

  }

}
