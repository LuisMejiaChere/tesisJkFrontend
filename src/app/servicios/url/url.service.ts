import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { PeriodoLectivo } from "src/app/modelos/periodo-lectivo/periodo-lectivo.models";
import { Criterio } from "src/app/modelos/criterio/criterio.models";
import { Subcriterio } from "src/app/modelos/subcriterio/subcriterio.models";
import { Indicador } from "src/app/modelos/indicador/indicador.models";
import {
  CriterioRespuesta,
  InicioSesionI,
  UsuarioLoginRespuesta,
  UsuarioLogoutRespuesta,
  PeriodoLectivoRespuesta,
  SubcriterioRespuesta,
  IndicadorRespuesta,
  ModeloCarreraRespuesta,
} from "src/app/interface/interfaces.interface";
import { ModeloCarrera } from "src/app/modelos/modelo-carrera/modelo-carrera.models";
import  * as myGlobals  from 'src/app/globals';

const PROTOCOL = "http";
// const PORT = 3000;
const VERSION = "v1";
const HOST = myGlobals.BASE_API_URL + "/backend.tesis.jk" || location.hostname;
//const HOST = '192.168.100.78/backend.tesis.jk' || location.hostname;

@Injectable({
  providedIn: "root",
})
export class UrlService {
  url: string;
  token = "";

  constructor(private http: HttpClient) {
    // this.url = `${PROTOCOL}://${HOST}:${PORT}/api/${VERSION}/`;
    this.url = `${PROTOCOL}://${HOST}/`;
    // this.url = "http://192.168.0.10/backend.tesis.jk/"
    // this.url = "https://backend-tesis-jk.000webhostapp.com/"
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        Token: this.getToken(),
        "Content-type": "application/json",
      }),
    };
  }

  // funcionalidad url
  get getTokenAutenticacion() {
    return this.token;
  }

  getToken() {
    return this.token;
  }

  set setTokenAutenticacion(data: string) {
    this.token = data || "";
  }

  limpiarTokenAutenticacion() {
    this.token = "";
  }

  private guardarDatosLocalStoras(token: string) {
    localStorage.setItem("token", token);
  }

  // inicio de sesion
  inicioDeSesion(data: InicioSesionI): Observable<UsuarioLoginRespuesta> {
    return this.http
      .post<UsuarioLoginRespuesta>(this.url + `Usuario/login`, data)
      .pipe(
        map((response) => {
          console.log(response);
          this.token = response.ok ? response.token : "";
          this.guardarDatosLocalStoras(this.token);
          return response;
        })
      );
  }

  // cerrar de sesion
  cerrarSesion(): Observable<any> {
    return this.http
      .get<UsuarioLogoutRespuesta>(this.url + `Usuario/logout`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // Criterios
  obtenerCriterio(): Observable<CriterioRespuesta> {
    return this.http.get<CriterioRespuesta>(
      this.url + "Criterio/seleccionarCriterio"
    );
  }

  obtenerCriteriActivos(): Observable<CriterioRespuesta> {
    return this.http.get<CriterioRespuesta>(this.url + 'Criterio/seleccionarCriterio_activo');
  }

  registrarCriterio(data: Criterio): Observable<CriterioRespuesta> {
    return this.http.post<CriterioRespuesta>(
      this.url + "Criterio/insertarCriterio",
      data,
      this.getOptions()
    );
  }

  modificarCriterio(data: Criterio): Observable<CriterioRespuesta> {
    return this.http.put<CriterioRespuesta>(
      this.url + `Criterio/actualizarCriterio/${data.id_criterio}`,
      data,
      this.getOptions()
    );
  }


  // SubCriterios
  obtenerSubcriterio(): Observable<SubcriterioRespuesta> {
    return this.http.get<SubcriterioRespuesta>(
      this.url + "Subcriterio/seleccionarSubcriterio"
    );
  }

  obtenerSubcriterioActivos(): Observable<SubcriterioRespuesta> {
    return this.http.get<SubcriterioRespuesta>(this.url + 'Subcriterio/seleccionarSubcriterio_activo');
  }

  registrarSubcriterio(data: Subcriterio): Observable<SubcriterioRespuesta> {
    return this.http.post<SubcriterioRespuesta>(
      this.url + "Subcriterio/insertarSubcriterio",
      data,
      this.getOptions()
    );
  }

  modificarSubcriterio(data: Subcriterio): Observable<SubcriterioRespuesta> {
    return this.http.put<SubcriterioRespuesta>(
      this.url + `Subcriterio/actualizarSubcriterio/${data.id_subcriterio}`,
      data,
      this.getOptions()
    );
  }

  obtenerSubcriterioId(id_criterio: number): Observable<SubcriterioRespuesta> {
    let data = { id_criterio: id_criterio }
    console.log(data);

    return this.http.put<SubcriterioRespuesta>(this.url + `Subcriterio/buscarSubcriterio/${id_criterio}`, data, this.getOptions());
  }






  // Indicadores
  obtenerIndicador(): Observable<IndicadorRespuesta> {
    return this.http.get<IndicadorRespuesta>(
      this.url + "Indicador/seleccionarIndicador"
    );
  }

  obtenerIndicadorActivos(): Observable<IndicadorRespuesta> {
    return this.http.get<IndicadorRespuesta>(this.url + 'Indicador/seleccionarIndicador_activo');
  }

  registrarIndicador(data: Indicador): Observable<IndicadorRespuesta> {
    return this.http.post<IndicadorRespuesta>(
      this.url + "Indicador/insertarIndicador",
      data,
      this.getOptions()
    );
  }

  modificarIndicador(data: Indicador): Observable<IndicadorRespuesta> {
    return this.http.put<IndicadorRespuesta>(
      this.url + `Indicador/actualizarIndicador/${data.id_indicador}`,
      data,
      this.getOptions()
    );
  }






  // Periodos Lectivod
  obtenerPeriodoLectivo(): Observable<PeriodoLectivoRespuesta> {
    return this.http.get<PeriodoLectivoRespuesta>(
      this.url + "Periodo/seleccionarPeriodo"
    );
  }

  obtenerPeriodosLectivosActivos(): Observable<PeriodoLectivoRespuesta> {
    return this.http.get<PeriodoLectivoRespuesta>(this.url + 'Periodo/seleccionarPeriodo_activo');
  }

  registrarPeriodoLectivo(
    data: PeriodoLectivo
  ): Observable<PeriodoLectivoRespuesta> {
    return this.http.post<PeriodoLectivoRespuesta>(
      this.url + "Periodo/insertarPeriodo",
      data,
      this.getOptions()
    );
  }

  modificarPeriodoLectivo(
    data: PeriodoLectivo
  ): Observable<PeriodoLectivoRespuesta> {
    return this.http.put<PeriodoLectivoRespuesta>(
      this.url + `Periodo/actualizarPeriodo/${data.id_periodo}`,
      data,
      this.getOptions()
    );
  }






  // Modelo carrera
  obtenerModeloCarrera(): Observable<ModeloCarreraRespuesta> {
    return this.http.get<ModeloCarreraRespuesta>(
      this.url + "listar.modelo.evaluacion.carrera"
    );
  }

  registrarModeloCarrera(
    data: ModeloCarrera
  ): Observable<ModeloCarreraRespuesta> {
    console.log(data);
    
    return this.http.post<ModeloCarreraRespuesta>(
      this.url + "Modelo_carrera/insertarModelo_carrera",
      data,
      this.getOptions()
    );
  }

  modificarModeloCarrera(
    data: ModeloCarrera
  ): Observable<ModeloCarreraRespuesta> {
    return this.http.put<ModeloCarreraRespuesta>(
      this.url + `Modelo_carrera/actualizarModelo_carrera/${data.id_modelo}`,
      data,
      this.getOptions()
    );
  }

}
