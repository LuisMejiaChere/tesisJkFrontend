import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { Indicador } from "src/app/modelos/indicador/indicador.models";
import { UrlService } from "src/app/servicios/url/url.service";
import { MensajeService } from "src/app/servicios/mensajes/mensaje.service";
import { IndicadorRespuesta } from "src/app/interface/interfaces.interface";

@Injectable({
  providedIn: "root",
})
export class IndicadorRepository {
  indicador: Indicador[] = [];
  indicadorActivo: Indicador[] = [];
  datosEmitir = new BehaviorSubject("first");

  constructor(
    private http: HttpClient,
    private url: UrlService,
    private ruta: Router,
    private notificacion: MensajeService,
    private usuarioRepo: UsuarioRepository
  ) {}

  vistaComponente(data: any) {
    return { ok: data.ok, mensaje: data.observacion };
  }

  obtenerIndicadorFecth() {
    this.url.obtenerIndicador().subscribe(
      (data: IndicadorRespuesta) => {
        if (data.estado) {
          this.indicador = data.datos;
        } else {
          this.notificacion.openSnackBar(data.observacion);
        }
        this.datosEmitir.next("second");
      },
      (error) => {
        this.datosEmitir.next("second");
        this.notificacion.openSnackBar(
          "No se pudo realizar la petición. Intente nuevamente."
        );
      }
    );
  }

  
  obtenerIndicadorActivoFecth() {
    this.url.obtenerIndicadorActivos().subscribe(
      (data: IndicadorRespuesta) => {
        if (data.estado) {
          this.indicadorActivo = data.datos;
        } else {
          this.notificacion.openSnackBar(data.observacion);
        }
        this.datosEmitir.next("second");
      },
      (error) => {
        this.datosEmitir.next("second");
        this.notificacion.openSnackBar(
          "No se pudo realizar la petición. Intente nuevamente."
        );
      }
    );
  }

  get obtenerIndicadores() {
    return this.indicador;
  }

  get obtenerIndicadoresActivos() {
    return this.indicadorActivo;
  }

  registrarIndicador(data: Indicador) {
    return this.url.registrarIndicador(data).pipe(
      map((data: IndicadorRespuesta) => {
        data.estado ? this.indicador.unshift(data.datos) : "";
        this.datosEmitir.next("second");
        return this.vistaComponente(data);
      })
    );
  }

  modificarIndicador(data: Indicador) {
    return this.url.modificarIndicador(data).pipe(
      map((data: IndicadorRespuesta) => {
        data.estado
          ? this.indicador.splice(
              this.indicador.findIndex(
                (p) => p.id === data.datos.id
              ),
              1,
              data.datos
            )
          : "";
        this.datosEmitir.next("second");
        return this.vistaComponente(data);
      })
    );
  }
}
