import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { InicioSesionI } from 'src/app/interface/interfaces.interface';
import { UsuarioRepository } from 'src/app/repositorio/usuario/usuario.repository';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { ErrorService } from 'src/app/servicios/errores/errores.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  formularioEnviado = false;
  usuarioSesion: InicioSesionI;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
    private usuario: UsuarioRepository,
    private notificacion: MensajeService,
    public error: ErrorService,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.usuarioSesion = { usuario: '', password: '' };
  }

  get jsonProduct() {
    return JSON.stringify(this.usuarioSesion);
  }

  enviarFormulario(form: NgForm) {
    this.formularioEnviado = true;
    if (form.valid) {
      this.iniciarSesion(this.usuarioSesion, form);
      this.formularioEnviado = false;
    }
  }

  iniciarSesion(data: InicioSesionI, formulario: NgForm) {
    this.usuario.inicioDeSesion(data).subscribe((dataa: any) => {
      if (dataa.ok) {
        this.router.navigate(['/principal']);
        formulario.reset();
      } else {
        this.notificacion.openSnackBar(dataa.observacion);
      }

    }, error => this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.'));
  }



  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
