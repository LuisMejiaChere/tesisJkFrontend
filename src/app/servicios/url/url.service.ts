import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
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
  EvaluadorRespuesta,
} from "src/app/interface/interfaces.interface";
import { ModeloCarrera } from "src/app/modelos/modelo-carrera/modelo-carrera.models";
import  * as myGlobals  from 'src/app/globals';
import { Evaluador } from "src/app/modelos/evaluador/evaluador.models";

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
    // this.url = `${PROTOCOL}://${HOST}/`;
    this.url = "http://188.166.96.154/backend.tesis.jk/"
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
  contarCriterio(): Observable<CriterioRespuesta> {
    return this.http.get<CriterioRespuesta>(
      this.url + "Criterio/contarCriterio"
    );
  }

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
      this.url + "Criterio/actualizarCriterio",
      data,
      this.getOptions()
    );
  }

  modificarCriterio(data: Criterio): Observable<CriterioRespuesta> {
    return this.http.put<CriterioRespuesta>(
      this.url + `Criterio/actualizarCriterio/${data.id}`,
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
      this.url + "Subcriterio/actualizarSubcriterio",
      data,
      this.getOptions()
    );
  }

  modificarSubcriterio(data: Subcriterio): Observable<SubcriterioRespuesta> {
    return this.http.put<SubcriterioRespuesta>(
      this.url + `Subcriterio/actualizarSubcriterio/${data.id}`,
      data,
      this.getOptions()
    );
  }

  obtenerSubcriterioId(id: number): Observable<SubcriterioRespuesta> {
    let data = { id: id }
    return this.http.put<SubcriterioRespuesta>(this.url + `Subcriterio/buscarSubcriterio/${id}`, data, this.getOptions());
  }






  // Indicadores
  contarIndicador(): Observable<IndicadorRespuesta> {
    return this.http.get<IndicadorRespuesta>(
      this.url + "indicador/contarIndicador"
    );
  }

  obtenerIndicador(): Observable<IndicadorRespuesta> {
    return this.http.get<IndicadorRespuesta>(
      this.url + "indicador/seleccionarIndicador"
    );
  }

  obtenerIndicadorActivos(): Observable<IndicadorRespuesta> {
    return this.http.get<IndicadorRespuesta>(this.url + 'indicador/seleccionarIndicador_activo');
  }

  registrarIndicador(data: Indicador): Observable<IndicadorRespuesta> {
    return this.http.post<IndicadorRespuesta>(
      this.url + "Indicador/actualizarIndicador",
      data,
      this.getOptions()
    );
  }

  modificarIndicador(data: Indicador): Observable<IndicadorRespuesta> {
    return this.http.put<IndicadorRespuesta>(
      this.url + `Indicador/actualizarIndicador/${data.id}`,
      data,
      this.getOptions()
    );
  }






  // Periodos Lectivod
  contarPeriodo(): Observable<PeriodoLectivoRespuesta> {
    return this.http.get<PeriodoLectivoRespuesta>(
      this.url + "Periodo/contarPeriodo"
    );
  }
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
      this.url + "Periodo/actualizarPeriodo",
      data,
      this.getOptions()
    );
  }

  modificarPeriodoLectivo(
    data: PeriodoLectivo
  ): Observable<PeriodoLectivoRespuesta> {
    return this.http.put<PeriodoLectivoRespuesta>(
      this.url + `Periodo/actualizarPeriodo/${data.id}`,
      data,
      this.getOptions()
    );
  }


  // Modelo carrera

  contarEvaluacion(): Observable<ModeloCarreraRespuesta> {
    return this.http.get<ModeloCarreraRespuesta>(
      this.url + "Modelo_carrera/contarEvaluacion");
  }

  obtenerModeloCarrera(): Observable<ModeloCarreraRespuesta> {
    return this.http.get<ModeloCarreraRespuesta>(
      this.url + "Modelo_carrera/seleccionar_modelo_carreras"
    );
  }

   obtenerModeloCarreraActivo(): Observable<ModeloCarreraRespuesta> {
    return this.http.get<ModeloCarreraRespuesta>(
      this.url + "Modelo_carrera/seleccionar_modelo_carreras_activo"
    );
  }

  registrarModeloCarrera(
    data: ModeloCarrera
  ): Observable<ModeloCarreraRespuesta> {
    return this.http.post<ModeloCarreraRespuesta>(
      this.url + "Modelo_carrera/actualizarModelo_carrera",
      data,
      this.getOptions()
    );
  }

  modificarModeloCarrera(
    data: ModeloCarrera
  ): Observable<ModeloCarreraRespuesta> {
    return this.http.put<ModeloCarreraRespuesta>(
      this.url + `Modelo_carrera/actualizarModelo_carrera/${data.id}`,
      data,
      this.getOptions()
    );
  }

  buscarEvidenciaModeloCarrerabyId(
    data: any
  ): Observable<any> {
    data = {id:data} 
    return this.http.get<any>(
      this.url + `Evidencia/seleccionar_evidencias?id=${data.id}`,
      data,
    );
  }

  EvidenciasModeloCarrera(): Observable<any> {
    return this.http.get<any>(
      this.url + `Evidencia/seleccionar_evidencias?id=0`,
    );
  }

 eliminarEvidenciaModeloCarrerabyId(
    data: any
  ): Observable<any> {
    data = {id:data} 
    return this.http.delete<any>(
      this.url + `Evidencia/eliminarEvidencia?id=${data.id}`,
      data,
    );
  }

  obtenerEvidenciasModeloCarrerabyId(
    data: any
  ): Observable<any> {
    data = {id:data} 
    return this.http.get(this.url + `Evidencia/evidencias_comprimir_zip?id=${data.id}`,
    data
    );
  }


  // Evaluadores
  obtenerEvaluadores(): Observable<EvaluadorRespuesta> {
    return this.http.get<EvaluadorRespuesta>(
      this.url + "Usuario/seleccionarUsuario?id=0"
    );
  }

  obtenerEvaluadoresActivos(): Observable<EvaluadorRespuesta> {
    return this.http.get<EvaluadorRespuesta>(this.url + 'Usuario/seleccionarEvaluador_activo');
  }

  registrarEvaluador(
    data: Evaluador
  ): Observable<EvaluadorRespuesta> {
    return this.http.post<EvaluadorRespuesta>(
      this.url + "Usuario/actualizarUsuario",
      data,
      this.getOptions()
    );
  }

  modificarEvaluador(
    data: Evaluador
  ): Observable<EvaluadorRespuesta> {
    return this.http.put<EvaluadorRespuesta>(
      this.url + `Usuario/actualizarUsuario?id=${data.id}`,
      data,
      // this.getOptions()
    );
  }

  modificarPerfil(
    data: Evaluador
  ): Observable<EvaluadorRespuesta> {
    return this.http.put<EvaluadorRespuesta>(
      this.url + `Usuario/modificarPerfil?id=${data.id}`,
      data,
      // this.getOptions()
    );
  }


  


}
