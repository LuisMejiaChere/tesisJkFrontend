import { Criterio } from "../modelos/criterio/criterio.models";
import { Usuario } from "../modelos/usuario/usuario.models";
import { PeriodoLectivo } from "../modelos/periodo-lectivo/periodo-lectivo.models";
import { Subcriterio } from "../modelos/subcriterio/subcriterio.models";
import { Indicador } from "../modelos/indicador/indicador.models";
import { ModeloCarrera } from "../modelos/modelo-carrera/modelo-carrera.models";

export interface UsuarioLoginRespuesta {
  ok?: boolean;
  observacion?: string;
  datos?: Usuario;
  token?: string;
}

export interface UsuarioLogoutRespuesta {
  ok?: boolean;
  observacion?: string;
  datos?: Usuario;
  token?: string;
}

export interface CriterioRespuesta {
  estado?: boolean;
  observacion?: string;
  datos?: Criterio[] & Criterio;
}

export interface SubcriterioRespuesta {
  estado?: boolean;
  observacion?: string;
  datos?: Subcriterio[] & Subcriterio;
}

export interface IndicadorRespuesta {
  estado?: boolean;
  observacion?: string;
  datos?: Indicador[] & Indicador;
}

export interface CriteriosI {
  idCriterio?: string;
  criterio?: string;
  estado?: boolean;
}

export interface InicioSesionI {
  usuario: string;
  password: string;
}

export interface PeriodoLectivoRespuesta {
  estado?: boolean;
  observacion?: string;
  datos?: PeriodoLectivo[] & PeriodoLectivo;
}

export interface ModeloCarreraRespuesta {
  estado?: boolean;
  observacion?: string;
  datos?: ModeloCarrera[] & ModeloCarrera;
}
