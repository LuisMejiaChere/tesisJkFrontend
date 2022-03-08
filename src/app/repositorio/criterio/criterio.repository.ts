import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { Criterio } from 'src/app/modelos/criterio/criterio.models';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { CriterioRespuesta } from 'src/app/interface/interfaces.interface';


@Injectable({
    providedIn: 'root'
  })

export class CriterioRepository {
    criterio: Criterio[] =[];
    criterioActivo: Criterio[] =[];
    datosEmitir = new BehaviorSubject('first');

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService, private usuarioRepo:UsuarioRepository) {}

   
    vistaComponente(data: any) {
        return { ok: data.ok, mensaje: data.observacion }
    }

    obtenerCriterioFecth() {
        this.url.obtenerCriterio().subscribe((data: CriterioRespuesta) => {
            if (data.ok) {
                this.criterio = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
                // this.usuarioRepo.logout();
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
            // this.usuarioRepo.logout();
        });
    }

    obtenerCriterioActivoFecth() {
        this.url.obtenerCriteriActivos().subscribe((data: CriterioRespuesta) => {
            if (data.ok) {
                this.criterioActivo = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
                // this.usuarioRepo.logout();
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
            // this.usuarioRepo.logout();
        });
    }



    get obtenerCriterios() {
        return this.criterio;
    }

    get obtenerCriteriosActivos() {
        return this.criterioActivo;
    }

    registrarCriterio(data: Criterio) {
        return this.url.registrarCriterio(data).pipe(
            map((data: CriterioRespuesta) => {
                data.ok ? this.criterio.unshift(data.datos) : '';
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));
    }

    modificarCriterio(data: Criterio) {
        return this.url.modificarCriterio(data).pipe(
            map((data: CriterioRespuesta) => {
                console.log(data);
                
                data.ok ? 
                this.criterio.splice(this.criterio.findIndex(p => p.id_criterio === data.datos.id_criterio), 1, data.datos) : ''
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));

    }

   

}

