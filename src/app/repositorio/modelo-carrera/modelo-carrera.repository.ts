import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MensajeService } from 'src/app/servicios/mensajes/mensaje.service';
import { ModeloCarreraRespuesta } from 'src/app/interface/interfaces.interface';
import { ModeloCarrera } from 'src/app/modelos/modelo-carrera/modelo-carrera.models';


@Injectable({
    providedIn: 'root'
  })

export class ModeloCarreraRepository {
    modeloCarrera: ModeloCarrera[] =[];
    datosEmitir = new BehaviorSubject('first');

    constructor(private http: HttpClient, private url: UrlService, private ruta: Router, private notificacion: MensajeService) {}

   
    vistaComponente(data: any) {
        return { ok: data.ok, mensaje: data.observacion }
    }

    obtenerModeloCarreraFecth() {
        this.url.obtenerModeloCarrera().subscribe((data: ModeloCarreraRespuesta) => {
            if (data.ok) {
                this.modeloCarrera = data.datos;   
                console.log( data.datos);             
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



    get obtenerModelosCarreras() {
        return this.modeloCarrera;
    }

    registrarModeloCarrera(data: ModeloCarrera) {
        return this.url.registrarModeloCarrera(data).pipe(
            map((data: ModeloCarreraRespuesta) => {
                data.ok ? this.modeloCarrera.unshift(data.datos) : '';
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));
    }

    modificarModeloCarrera(data: ModeloCarrera) {
        return this.url.modificarModeloCarrera(data).pipe(
            map((data: ModeloCarreraRespuesta) => {
                console.log(data);
                
                data.ok ? 
                this.modeloCarrera.splice(this.modeloCarrera.findIndex(p => p.id_modelo === data.datos.id_modelo), 1, data.datos) : ''
                this.datosEmitir.next('second');
                return this.vistaComponente(data);
            }));

    }

   

}

