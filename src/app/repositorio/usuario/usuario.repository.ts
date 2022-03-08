import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario/usuario.models';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { InicioSesionI, UsuarioLoginRespuesta, UsuarioLogoutRespuesta } from 'src/app/interface/interfaces.interface';


@Injectable({
    providedIn: 'root'
})

export class UsuarioRepository {

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService) {
        this.TraerDatosAutenticacion();
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
                console.log(data);
                if (data.ok) {
                    this.usuario = data.datos[0];
                    this.guardarDatosLocalStoras();
                }
                return { ok: data.ok, observacion: data.observacion };
            }));
    }

    guardarDatosLocalStoras() {
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
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

}

