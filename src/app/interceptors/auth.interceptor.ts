import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthenticationHelper } from '../helpers/authentication.helper';

/*
    Mapear os endpoints que precisam de autorização
*/
const endpoints = [
  environment.apiContatos + '/contatos',
  environment.apiContatos + '/dashboard',
];

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

    //construtor
    constructor(
        private authenticationHelper: AuthenticationHelper
    ){ }

    //método para interceptar as requisições da API
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //verificando se a requisição é para um dos endpoints mapeados
        if(endpoints.some(item => req.url.includes(item))) {
            //capturar o token do usuário autenticado
            const accessToken = this.authenticationHelper.getData()?.accessToken;
            //adicionar o token na chamada da requisição
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` }
            });
        }

        //liberando a requisição
        return next.handle(req);
    }
}
