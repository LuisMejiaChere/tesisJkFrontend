import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { PeriodoLectivo } from 'src/app/modelos/periodo-lectivo/periodo-lectivo.models';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { PeriodoLectivoRespuesta } from 'src/app/interface/interfaces.interface';


@Injectable({
    providedIn: 'root'
  })

export class PeriodoLectivoRepository {
    periodo: PeriodoLectivo[] =[];
    periodoActivo: PeriodoLectivo[] =[];
    datosEmitir = new BehaviorSubject('first');

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService, private usuarioRepo:UsuarioRepository) {}

   
    vistaComponente(data: any) {
        return { ok: data.ok, mensaje: data.observacion }
    }

    obtenerPeriodoLectivoFecth() {
        this.url.obtenerPeriodoLectivo().subscribe((data: PeriodoLectivoRespuesta) => {
            if (data.estado) {
                this.periodo = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }

    obtenerPeriodoLectivoActivoFecth() {
        this.url.obtenerPeriodosLectivosActivos().subscribe((data: PeriodoLectivoRespuesta) => {
            if (data.estado) {
                this.periodoActivo = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }



    get obtenerPeriodos() {
        return this.periodo;
    }

    get obtenerPeriodosActivos() {

        return this.periodoActivo;
    }

    registrarPeriodo(data: PeriodoLectivo) {
        return this.url.registrarPeriodoLectivo(data).pipe(
            map((data: PeriodoLectivoRespuesta) => {
                data.estado ? this.periodo.unshift(data.datos) : '';
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));
    }

    modificarPeriodo(data: PeriodoLectivo) {
        return this.url.modificarPeriodoLectivo(data).pipe(
            map((data: PeriodoLectivoRespuesta) => {  
                data.estado ? 
                this.periodo.splice(this.periodo.findIndex(p => p.id === data.datos.id), 1, data.datos) : ''
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));

    }

   

}

