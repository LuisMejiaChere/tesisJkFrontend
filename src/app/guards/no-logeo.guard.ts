import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../repositorio/usuario/usuario.repository';

@Injectable({
  providedIn: 'root'
})
export class NoLogeoGuard implements CanActivate {
  constructor(public ruta: Router, private usuario: UsuarioRepository) { }

  canActivate() {
    if (this.usuario.estaAutenticado()) {
      this.ruta.navigate(['/principal/tablero']);
      return false;
    } else {
      return true;
    }

  }
}
