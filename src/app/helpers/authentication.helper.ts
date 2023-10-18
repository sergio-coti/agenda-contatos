import { Injectable } from '@angular/core';
import { AutenticarResponseModel } from '../models/usuarios/autenticar-response.model';
import { decryptData, encryptData } from '../utils/crypto.util';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHelper {
  
  //chave dos dados na local storage
  auth: string = 'auth';

  /*
  Método para salvar os dados do usuário autenticado
  na local storage do navegador
  */
  signIn(model: AutenticarResponseModel): void {
    //converter o objeto em JSON e criptografar os dados
    const data = encryptData(JSON.stringify(model), environment.cryptoKey);
    //salvar os dados na local storage
    localStorage.setItem(this.auth, data);
  }

  /*
  Método para verificar se o usuário está autenticado
  (Os dados da local storage são válidos)
  */
  isSignedIn(): boolean {
    //capturar os dados da local storage
    const model = this.getData();
    if (model != null) {
      //verificando se o token ainda é válido (data de expiração)
      const dataAtual = new Date();
      const dataExpiracao = new Date(model.expiration as Date);
      if (dataAtual <= dataExpiracao) {
        return true; //usuário está autenticado!
      } else {
        this.signOut(); //logout!
      }
    }

    return false;
  }

  /*
 Método para retornar os dados da local storage
 */
  getData(): AutenticarResponseModel | null {
    //ler os dados gravados
    const data = localStorage.getItem(this.auth);
    //verificando se não é vazio
    if (data != null) {
      //descriptografando os dados e converter para objeto
      const model = JSON.parse(decryptData(data, environment.cryptoKey));
      return model; //retornando o objeto
    }

    return null;
  }

  /*
  Método para apagar os dados da local storage
  */
  signOut(): void {
    localStorage.removeItem(this.auth);
  }
}
