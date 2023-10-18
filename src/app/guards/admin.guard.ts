import { Injectable } from '@angular/core';
import { AuthenticationHelper } from '../helpers/authentication.helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
    
  //método construtor
  constructor(
    private authenticationHelper: AuthenticationHelper,
    private router: Router
  ) {}

  //método para verificar se a rota pode ser acessada
  canActivate(): boolean {
    //verificar se o usuário está autenticado
    if (this.authenticationHelper.isSignedIn()) {
      //rota pode ser acessada
      return true;
    } else {
      //trocar a rota do usuário (página de login)
      this.router.navigate(['/account/login']);
      return false;
    }
  }
}
