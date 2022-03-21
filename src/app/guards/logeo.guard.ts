import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../repositorio/usuario/usuario.repository';

@Injectable({
  providedIn: 'root'
})
export class LogeoGuard implements CanActivate{
  constructor(public ruta: Router, private usuario: UsuarioRepository) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.usuario.estaAutenticado()) {
      this.ruta.navigate(['/logeo']);
      return false;
    } else {
      return true;
    }
  }
  
}
