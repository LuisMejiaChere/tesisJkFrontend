import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario/usuario.models';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { EvaluadorRespuesta, InicioSesionI, UsuarioLoginRespuesta, UsuarioLogoutRespuesta } from 'src/app/interface/interfaces.interface';
import { Evaluador } from 'src/app/modelos/evaluador/evaluador.models';


@Injectable({
    providedIn: 'root'
})

export class UsuarioRepository {

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService) {
        this.TraerDatosAutenticacion();
    }

    vistaComponente(data: any) {
        return { ok: data.ok, mensaje: data.observacion }
    }

    usuario: Usuario;

    estaAutenticado(): boolean {
        return this.url.getTokenAutenticacion !== ''
            && this.url.getTokenAutenticacion !== null
            && this.url.getTokenAutenticacion !== undefined;
    }

    limpiarAutenticacion() {
        this.url.limpiarTokenAutenticacion();
    }

    inicioDeSesion(data: InicioSesionI) {
        return this.url.inicioDeSesion(data).pipe(     
            map((data: UsuarioLoginRespuesta) => {              
                if (data.ok) {
                    this.usuario = data.datos[0];
                    this.guardarDatosLocalStoras(this.usuario);
                }
                return { ok: data.ok, observacion: data.observacion };
            }));
    }

    guardarDatosLocalStoras(data) {
        localStorage.setItem('usuario', JSON.stringify(data));
    }

    TraerDatosAutenticacion() {
        if (localStorage.getItem('usuario')) {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.url.setTokenAutenticacion = localStorage.getItem('token');
        } else {
            this.limpiarApp();
        }
    }


    limpiarApp() {
        localStorage.clear();
        this.usuario = null;
        this.logout()
    }

    logout() {
        this.url.cerrarSesion().subscribe((data: UsuarioLogoutRespuesta) => {
            if (!data.ok) {
                localStorage.clear();
                this.usuario = null;
                this.limpiarAutenticacion();
                this.ruta.navigate(['/logeo']);
            } else {
                this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
            }
        }, error => {
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }

    restablecerContrasena(data){
        this.url.restablecerContrasena(data).subscribe((resp:any)=>{
            if(resp.estado){
                this.notificacion.openSnackBar(resp.observacion);
                this.ruta.navigate(['/logeo']);
               
            }else {
                this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
            }
        }, error => {
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }

    modificarPerfil(data: Evaluador) {
        this.url.modificarPerfil(data).subscribe((data: EvaluadorRespuesta) => {   
            if (data.estado) {
                this.usuario = data.datos;
                this.guardarDatosLocalStoras(this.usuario);
            } else {
                this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
            }
        }, error => {
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });

    }

    TraerRol(){
        if (localStorage.getItem('usuario')) {
          return this.usuario.rol = JSON.parse(localStorage.getItem('usuario')).rolid
        } else {
            this.limpiarApp();
        }
    }

}

