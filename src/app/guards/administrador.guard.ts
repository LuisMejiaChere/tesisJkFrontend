
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../repositorio/usuario/usuario.repository';



@Injectable()
export class AdmininistradorGuard implements CanActivate {

  constructor(public ruta: Router, private usuario: UsuarioRepository) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.chekAdministrador(route);
  }

  chekAdministrador(route: ActivatedRouteSnapshot):boolean{
    const role = this.usuario.TraerRol();
    if(role.includes(route.data.role)){
      return true
    }else{
      this.ruta.navigate(['/principal/404']);
      return false
    }
  }

}
