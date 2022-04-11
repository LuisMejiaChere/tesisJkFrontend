import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { CriterioRespuesta, EvaluadorRespuesta } from 'src/app/interface/interfaces.interface';
import { Evaluador } from 'src/app/modelos/evaluador/evaluador.models';


@Injectable({
    providedIn: 'root'
  })

export class EvaluadorRepository {
    evaluador: Evaluador[] =[];
    evaluadorActivo: Evaluador[] =[];
    datosEmitir = new BehaviorSubject('first');

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService, private usuarioRepo:UsuarioRepository) {}

   
    vistaComponente(data: any) {
        return { ok: data.estado, mensaje: data.observacion }
    }

    obtenerEvaluadorFecth() {
        this.url.obtenerEvaluadores().subscribe((data: EvaluadorRespuesta) => {
            if (data.estado) {
                this.evaluador = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }

    obtenerEvaluadorActivoFecth() {
        this.url.obtenerEvaluadoresActivos().subscribe((data: EvaluadorRespuesta) => {
            if (data.estado) {
                this.evaluadorActivo = data.datos;                
            } else {
                this.notificacion.openSnackBar(data.observacion);
            }
            this.datosEmitir.next('second');
        }, error => {
            this.datosEmitir.next('second');
            this.notificacion.openSnackBar('No se pudo realizar la petición. Intente nuevamente.');
        });
    }



    get obtenerEvaluadores() {
        return this.evaluador;
    }

    get obtenerEvaluadoresActivos() {
        return this.evaluadorActivo;
    }

    registrarEvaluador(data: Evaluador) {
        return this.url.registrarEvaluador(data).pipe(
            map((data: EvaluadorRespuesta) => {
                data.estado ? this.evaluador.unshift(data.datos) : '';
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));
    }

    modificarEvaluador(data: Evaluador) {
        return this.url.modificarEvaluador(data).pipe(
            map((data: EvaluadorRespuesta) => {
                data.estado ? 
                this.evaluador.splice(this.evaluador.findIndex(p => p.id === data.datos.id), 1, data.datos) : ''
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));

    }  


}

