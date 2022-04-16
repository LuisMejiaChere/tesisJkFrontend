import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDialodErrorComponent } from 'src/app/componentes/modal-dialog-error/modal-dialog-error.component';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(
   
    private dialog: MatDialog,
    private overlay: Overlay
  ) { }


  uploadFile(form_data: any,){
     return new Promise((exito, fallo) => {
        const URL = "http://188.166.96.154/backend.tesis.jk/Evidencia/actualizarEvidencia" || location.hostname;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL, true)
            xhr.onreadystatechange = () => {
            xhr.readyState === 4
              ? xhr.status === 200
                ? (exito(JSON.parse(xhr.response)))
                : (fallo(xhr.response))
              : ' '
          }; 
        xhr.send(form_data)
      });
    
  }

  displayAlertDialog(options?: any){
    let global_options = {
      autoFocus: false,
      panelClass: 'modhyobitto-dialog-container',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    };
    let dialog_config = {...global_options, ...options};
    let dialog_ref = this.dialog.open(
      ModalDialodErrorComponent,
      dialog_config
    );
    return dialog_ref;
  }

  scrollToElement(element_ref: any, offset = 10){
    setTimeout(()=>{
      let is_selector = (typeof element_ref) == 'string';
      let element = (is_selector)? document.querySelector(element_ref) : element_ref;
      let scroll_extent = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo(0, scroll_extent);
    }, 200);
  }

  unsubscribeAll(subs: any[]){
    let sub_count = subs.length;
    for(let i=0; i < sub_count; i++){
      let current_sub = subs[i];
      if(!!current_sub){
        current_sub.unsubscribe();
      }
    }
  }

 
}
