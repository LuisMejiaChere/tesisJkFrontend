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
    subCriterioActivo: Subcriterio[] =[];
    datosEmitir = new BehaviorSubject('first');

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService, private usuarioRepo:UsuarioRepository) {}

   
    vistaComponente(data: any) {
        return { ok: data.ok, mensaje: data.observacion }
    }

    obtenerSubcriterioFecth() {
        this.url.obtenerSubcriterio().subscribe((data: SubcriterioRespuesta) => {
            if (data.ok) {
                this.subCriterio = data.datos;                
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

    obtenerSubcriterioActivoFecth() {
        this.url.obtenerSubcriterioActivos().subscribe((data: SubcriterioRespuesta) => {
            if (data.ok) {
                this.subCriterioActivo = data.datos;                
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

    obtenerSubcriterioId(data :number) {
        this.url.obtenerSubcriterioId(data).subscribe((data: SubcriterioRespuesta) => {
            if (data.ok) {
                this.subCriterio = data.datos;           
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


    get obtenerSubcriterios() {
        return this.subCriterio;
    }

 

    registrarSubcriterio(data: Subcriterio) {
        return this.url.registrarSubcriterio(data).pipe(
            map((data: SubcriterioRespuesta) => {
                data.ok ? this.subCriterio.unshift(data.datos) : '';
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));
    }

    modificarSubcriterio(data: Subcriterio) {
        return this.url.modificarSubcriterio(data).pipe(
            map((data: SubcriterioRespuesta) => {
                console.log(data);
                
                data.ok ? 
                this.subCriterio.splice(this.subCriterio.findIndex(p => p.id_subcriterio === data.datos.id_subcriterio), 1, data.datos) : ''
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));

    }

   

}

