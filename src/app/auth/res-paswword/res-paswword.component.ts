import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import icMail from '@iconify/icons-ic/twotone-mail';
import icBack from '@iconify/icons-ic/twotone-arrow-back';
import icContactMail from '@iconify/icons-ic/twotone-contact-mail';
import { UsuarioRepository } from 'src/app/repositorio/usuario/usuario.repository';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
@Component({
  selector: 'vex-res-paswword',
  templateUrl: './res-paswword.component.html',
  styleUrls: ['./res-paswword.component.scss'],
})
export class ResPaswwordComponent implements OnInit {

  form = this.fb.group({
    correo: [null, Validators.required],
    cedula: [null, Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
  ])]

  });
  btnActivo = true;
  icMail = icMail;
  icBack = icBack;
  icContactMail = icContactMail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioRepo: UsuarioRepository,
    private snack: MensajeService,
  ) { }

  ngOnInit() {
  }

  

  send(form) {
    form.status === 'VALID'
    ? this.usuarioRepo.restablecerContrasena(form.value)
    : ''
  }



  retroceder(){
    this.router.navigate(['/']);
  }

  controlador = (data: any) => {
    if (data.ok) {
      this.snack.openSnackBar(data.mensaje);
    }
  }
  
  errores = (data: any) => {
    this.snack.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
  }
}