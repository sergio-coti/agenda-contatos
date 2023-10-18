import { HttpClient } from '@angular/common/http';
import { CriarContaRequestModel } from '../models/usuarios/criarconta-request.model';
import { Observable } from 'rxjs';
import { CriarContaResponseModel } from '../models/usuarios/criarconta-response.model';
import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { AutenticarRequestModel } from '../models/usuarios/autenticar-request.model';
import { AutenticarResponseModel } from '../models/usuarios/autenticar-response.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  //construtor
  constructor(
    //injeção de dependência
    private httpClient: HttpClient
  ) {}

  /*
    Método para executar a criação de conta de usuário
    */
  criarConta(
    model: CriarContaRequestModel
  ): Observable<CriarContaResponseModel> {
    //Requisição POST para o serviço
    return this.httpClient.post<CriarContaResponseModel>(
      environment.apiContatos + '/criar-conta',
      model
    );
  }

  /*
    Método para executar a autenticação de usuário
    */
  autenticar(
    model: AutenticarRequestModel
  ): Observable<AutenticarResponseModel> {
    //Requisição POST para o serviço
    return this.httpClient.post<AutenticarResponseModel>(
      environment.apiContatos + '/autenticar',
      model
    );
  }
}
