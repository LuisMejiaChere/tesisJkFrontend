import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { Subcriterio } from 'src/app/modelos/subcriterio/subcriterio.models';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { SubcriterioRespuesta } from 'src/app/interface/interfaces.interface';


@Injectable({
    providedIn: 'root'
  })

export class SubcriterioRepository {
    subCriterio: Subcriterio[] =[];
    subCriterioId: Subcriterio[] =[];
    subCriterioActivo: Subcriterio[] =[];
    datosEmitir = new BehaviorSubject('first');

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService, private usuarioRepo:UsuarioRepository) {}

   
    vistaComponente(data: any) {
        return { ok: data.ok, mensaje: data.observacion }
    }

    obtenerSubcriterioFecth() {
        this.url.obtenerSubcriterio().subscribe((data: SubcriterioRespuesta) => {
            if (data.estado) {
                this.subCriterio = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        })
    }

    obtenerSubcriterioActivoFecth() {
        this.url.obtenerSubcriterioActivos().subscribe((data: SubcriterioRespuesta) => {
            if (data.estado) {
                this.subCriterioActivo = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }

    obtenerSubcriterioId(data :number) {
        this.url.obtenerSubcriterioId(data).subscribe((data: SubcriterioRespuesta) => {
            if (data.estado) {
                this.subCriterioId = data.datos;           
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }


    get obtenerSubcriterios() {
        return this.subCriterio;
    }

    get obtenerSubcriterioUnicoId() {
        return this.subCriterioId;
    }

 

    registrarSubcriterio(data: Subcriterio) {
        return this.url.registrarSubcriterio(data).pipe(
            map((data: SubcriterioRespuesta) => {
                data.estado ? this.subCriterio.unshift(data.datos) : '';
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));
    }

    modificarSubcriterio(data: Subcriterio) {
        return this.url.modificarSubcriterio(data).pipe(
            map((data: SubcriterioRespuesta) => {
                data.estado ? 
                this.subCriterio.splice(this.subCriterio.findIndex(p => p.id === data.datos.id), 1, data.datos) : ''
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));

    }

   

}

