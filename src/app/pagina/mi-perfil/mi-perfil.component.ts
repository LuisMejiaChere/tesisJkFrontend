import { Component, OnInit, ViewChild } from '@angular/core';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icCoPresent from '@iconify/icons-ic/twotone-co-present';
import icAccountBox from '@iconify/icons-ic/twotone-account-box';
import icContactMail from '@iconify/icons-ic/twotone-contact-mail';
import { Evaluador } from 'src/app/modelos/evaluador/evaluador.models';
import { ModalActualizarMiPerfilComponent } from 'src/app/componentes/modal-actualizar-mi-perfil/modal-actualizar-mi-perfil.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { EvaluadorRepository } from 'src/app/repositorio/evaluador/evaluador.repository';
import { UsuarioRepository } from 'src/app/repositorio/usuario/usuario.repository';
import { UrlService } from 'src/app/servicios/url/url.service';
import { EvaluadorRespuesta } from 'src/app/interface/interfaces.interface';




@Component({
  selector: 'vex-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],

})
export class MiPerfilComponent implements OnInit {
 
  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icEdit=icEdit;
  icCoPresent = icCoPresent;
  icAccountBox = icAccountBox;
  icContactMail = icContactMail

  dialogSubmitSubscription: any;
  dialogRef: MatDialogRef<ModalActualizarMiPerfilComponent, any>;
  miPerfil: any;

  constructor(private url: UrlService,public dialog: MatDialog,private snack: MensajeService, public usuarioRepo:UsuarioRepository) {
  
  }
  ngOnInit(): void {
    this.miPerfil = JSON.parse(localStorage.getItem('usuario'))
   
  }

  openDialog(accion: string, data: Evaluador) {
    this.dialogRef = this.dialog.open(ModalActualizarMiPerfilComponent, {
      data: { accion, data },
    });

    if (this.dialogSubmitSubscription) {
      this.dialogSubmitSubscription.unsubscribe();
    }

    this.dialogSubmitSubscription = this.dialogRef.componentInstance.close
      .subscribe(result => {
       
        if (result === undefined) { return; }

        if (result.accion === 'Modificar') {
          this.modificarMiPefil(result.data);
        } else {
          'nada'
        }
      });
  }

  modificarMiPefil(dat: Evaluador) {
      this.url.modificarPerfil(dat).subscribe((data: EvaluadorRespuesta) => {   
          if (data.estado) {
              this.miPerfil = data.datos;
              this.snack.openSnackBar(data.observacion)
              this.usuarioRepo.guardarDatosLocalStoras(this.miPerfil);
              this.dialogRef.close();
          } else {
              this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
          }
      }, error => {
          this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
      });
  }



}
