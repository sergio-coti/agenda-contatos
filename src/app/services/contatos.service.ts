import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContatosPostModel } from '../models/contatos/contatos-post.model';
import { Observable } from 'rxjs';
import { ContatosGetModel } from '../models/contatos/contatos-get.model';
import { environment } from 'src/environments/environment.development';
import { ContatosPutModel } from '../models/contatos/contatos-put.model';
import { DashboardGetModel } from '../models/contatos/dashboard-get.model';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  constructor(private httpClient: HttpClient) {}

  //POST /api/contatos
  post(model: ContatosPostModel): Observable<ContatosGetModel> {
    return this.httpClient.post<ContatosGetModel>(
      environment.apiContatos + '/contatos',
      model
    );
  }

  //PUT /api/contatos
  put(model: ContatosPutModel): Observable<ContatosGetModel> {
    return this.httpClient.put<ContatosGetModel>(
      environment.apiContatos + "/contatos",
      model
    );
  }

  //DELETE /api/contatos/{id}
  delete(id: string): Observable<ContatosGetModel> {
    return this.httpClient.delete<ContatosGetModel>(
      environment.apiContatos + '/contatos/' + id
    );
  }

  //GET /api/contatos/{id}
  getById(id: string): Observable<ContatosGetModel> {
    return this.httpClient.get<ContatosGetModel>(
      environment.apiContatos + '/contatos/' + id
    );
  }

  //GET /api/contatos
  getAll(): Observable<ContatosGetModel[]> {
    return this.httpClient.get<ContatosGetModel[]>(
      environment.apiContatos + '/contatos'
    );
  }

  //GET /api/dashboard
  getDashboard(): Observable<DashboardGetModel[]> {
    return this.httpClient.get<DashboardGetModel[]>(
      environment.apiContatos + "/dashboard"
    );
  }
}
