import { Component, Inject, Optional, EventEmitter, Output, ViewChild, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import icClear from '@iconify/icons-ic/twotone-clear';
import icFileUpload from '@iconify/icons-ic/twotone-file-upload';
import { Criterio } from 'src/app/modelos/criterio/criterio.models';
import { Subscription } from 'rxjs';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { UploadFilesService } from 'src/app/servicios/upload-files/upload-files.service';
import { ModeloCarrera } from 'src/app/modelos/modelo-carrera/modelo-carrera.models';
import { ModeloCarreraRepository } from 'src/app/repositorio/modelo-carrera/modelo-carrera.repository';

import icDelete from '@iconify/icons-ic/twotone-delete';
import { add } from 'date-fns';

@Component({
  selector: 'vex-modal-actualizar-evidencia',
  templateUrl: './modal-actualizar-evidencia.component.html',
  styleUrls: ['./modal-actualizar-evidencia.component.scss']
})
export class ModalActualizarEvidenciaComponent implements OnInit, OnDestroy{
  accion: string;
  isChecked = true;
  dataModelo: any;
  formularioEnviado = false;
  bloquearBoton = false;
  @Output() close = new EventEmitter<any>();
  icClose = icClose;
  icClear = icClear;
  icDelete = icDelete;
  icFileUpload = icFileUpload;
  archivos = [];
  archivosModificado = [];
  archivosTodos = [];
  archivoAux = [];
  file_upload_config = {
    API: 'file_upload',
    MIME_types_accepted: "",
    is_multiple_selection_allowed: true,
    data: null
  };

  selected_files: {
    file: any,
    is_upload_in_progress: boolean,
    upload_result: any
  }[] = [];

  @ViewChild("fileSelector", {static: false}) file_selector!: ElementRef;

  file_selection_form: FormGroup;

  // Subscriptions
  private file_selection_sub!: Subscription;
  private file_upload_sub!: any;
  constructor(
    private snack: MensajeService,
    private uploadService: UploadFilesService,
    public modeloCarreraRepo: ModeloCarreraRepository,
    public dialogRef: MatDialogRef<ModalActualizarEvidenciaComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public obj) {
      this.file_selection_form = new FormGroup({
        file_selection: new FormControl()
      });
    dialogRef.disableClose = true;
    this.accion = obj.accion;
    this.dataModelo = this.fabrica(obj.data);
   this.obtenerEvidencias(this.dataModelo.id);
    this.dataModelo.estado === "1" ? this.isChecked:this.isChecked=false;
  }
  
  fabrica(data = {}) {
    return (Object.values(data)).length === 0 ? new Criterio() : { ...data };
  }

  get getmostrar() {
    return JSON.stringify(this.dataModelo)
  }

  obtenerEvidencias(id){
    this.modeloCarreraRepo.buscarEvidenciaModeloCarrerabyId(id).subscribe((data:any)=>{
      if (data.estado) { 
        this.archivos.push(...data.datos)
      }
    })
  }

  cerrarModal() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  clickQuitarArchivo(id) {
    // console.log(id);
    this.deleteConfirmation(id)
    
    // this.actualizarLista();
  }

  enviarFormulario(form: NgForm) {
  
    this.formularioEnviado = true;
    if (form.valid) {
      this.bloquearBoton = true;
      const data = { ...this.dataModelo }
      data.estado = this.dataModelo.estado? "1":"0";
      this.close.emit({ accion: this.accion, data });
    }
    this.bloquearBoton = false;
  }

  ngOnInit(): void {
    this.trackFileSelection();
  }
  
  openFileSelector(){
    const file_selection = this.file_selector.nativeElement;
    file_selection.click();
  }
  
  trackFileSelection(){
    this.file_selection_sub = this.file_selection_form.get('file_selection')?.valueChanges.subscribe(
      ()=>{
        const file_selection = this.file_selector.nativeElement;
       this.selectFiles(file_selection.files);
        this.file_selector.nativeElement.value = '';
      }
    ) as Subscription;
  }

  selectFiles(incoming_files: any[]){
    let incoming_file_count  = incoming_files.length;
    let incorrect_MIME_type = false;
    for(let i = 0; i < incoming_file_count; i++){
      let incoming_file = incoming_files[i];
      if(!!!this.file_upload_config.MIME_types_accepted || this.file_upload_config.MIME_types_accepted.indexOf(incoming_file.type)>=0){
        let selected_file = {
          file: incoming_file,
          is_upload_in_progress: false,
          upload_result: null
        };
        this.selected_files.push(selected_file);
      }else{
        incorrect_MIME_type = true;
      }
    }
    // Display error
    if(incorrect_MIME_type){
      let message = "Solo se permiten archivos de los siguientes tipos MIME: "+this.file_upload_config.MIME_types_accepted;
      this.snack.openSnackBar(message);
    }
  }

  addEvidencia(datos){
    this.archivos.push(datos)
  }


  uploadFile(index: number){
    const fd = new FormData()
    let file_for_upload = this.selected_files[index];
    fd.append('documento[]', file_for_upload.file);
    fd.append('modeloid', this.dataModelo.id);
    fd.append('estado', '1');
    file_for_upload.is_upload_in_progress = true;
    file_for_upload.upload_result = null;
    this.file_upload_sub = this.uploadService.uploadFile(fd).then((value: any)=> {
     
      if(value.estado){
       
             setTimeout(()=>{
             
          file_for_upload.upload_result=value.observacion;  
          if(file_for_upload.file.name.indexOf('error')>=0){
            file_for_upload.upload_result =  'error';
          }
          file_for_upload.is_upload_in_progress = false;
        },5000);
        this.addEvidencia(value.datos)
      }else{
        file_for_upload.upload_result=value.observacion;
          file_for_upload.is_upload_in_progress = false;
      }
      
    })
   
  }

  uploadAll(){
    let selected_file_count  = this.selected_files.length;
    for(let i = 0; i < selected_file_count; i++){
      let selected_file = this.selected_files[i];
      // Checking if the file can be uploaded
      if(!selected_file.is_upload_in_progress && selected_file.upload_result!='success'){
        this.uploadFile(i);
      }
    }
  }

  inititateFileCancel(index: number){
    let file_for_upload = this.selected_files[index];
    if(file_for_upload.is_upload_in_progress){
      this.displayFileUploadAbortConfirmation(
        ()=>{
          this.cancelFile(index);
        }
      );
    }else{
      this.cancelFile(index);
    }
  }
  
  displayFileUploadAbortConfirmation(cancel_method: any){
    this.uploadService.displayAlertDialog({
      data:{
        title: "¿Cancelar la carga del archivo?",
        message: "La carga ya está en progreso. Cancelar ahora podría generar inconsistencias en los datos.",
        dismiss_text: 'Cerrar',
        action_text: 'Aceptar',
        action: ()=>{
          cancel_method();
        }
      }
    });
  }

  deleteConfirmation(id: any){
    this.uploadService.displayAlertDialog({
      data:{
        title: "¿Desea eliminar el archivo?",
        message: "Si lo haces ya no podrás recuperarlo..",
        dismiss_text: 'Cerrar',
        action_text: 'Aceptar',
        action: ()=>{
          this.modeloCarreraRepo.eliminarEvidenciaModeloCarrerabyId(id).subscribe((data:any)=>{
            if (data.estado) {
              this.archivos.forEach(function(car, index, object) {
                if(car.id === id){
                  object.splice(index, 1);
                  
                }
               
              });
              this.snack.openSnackBar(data.observacion);
              // this.archivos.push(data.datos)
            }
          })
        }
      }
    });
  }

  cancelFile(index: number){
    this.selected_files.splice(index, 1);
  }

  initiateCancelAll(){
    let selected_file_count  = this.selected_files.length;
    let is_any_file_being_uploaded = false;
    for(let i = 0; i < selected_file_count; i++){
      let selected_file = this.selected_files[i];
      // Checking if the file is being uploaded
      if(selected_file.is_upload_in_progress){
        is_any_file_being_uploaded = true;
        break;
      }
    }
    if(is_any_file_being_uploaded){
      this.displayFileUploadAbortConfirmation(
        ()=>{
          this.cancelAll();
        }
      );
    }else{
      this.cancelAll();
    }
  }

  cancelAll(){
    this.uploadService.scrollToElement('.modhyobitto-file-uploader', 100);
    let selected_file_count  = this.selected_files.length;
    for(let i = 0; i < selected_file_count; i++){
      this.selected_files.splice(0, 1);
    }
  }

  isAnyFileNotUploaded(){
    let selected_file_count  = this.selected_files.length;
    let is_any_file_not_uploaded = false;
    for(let i = 0; i < selected_file_count; i++){
      let selected_file = this.selected_files[i];
      // Checking if the file can be uploaded
      if(!selected_file.is_upload_in_progress && selected_file.upload_result!='success'){
        is_any_file_not_uploaded = true;
        break;
      }
    }
    return is_any_file_not_uploaded;
  }
  
  ngOnDestroy(): void {
    this.uploadService.unsubscribeAll([
      this.file_selection_sub,
      this.file_upload_sub
    ]);
  }


 

}

