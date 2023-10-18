import { Component, OnInit } from '@angular/core';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  //variáveis do componente
  isSignedIn: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //construtor
  constructor(
    private authenticationHelper: AuthenticationHelper
    ) {}

  //método executado quando o componente é renderizado
  ngOnInit(): void {
    this.isSignedIn = this.authenticationHelper.isSignedIn();
    if(this.isSignedIn) {
      //capturando os dados do usuário autenticado
      const data = this.authenticationHelper.getData();
      this.nomeUsuario = data?.nome as string;
      this.emailUsuario = data?.email as string;
    }
  }

  //método para fazer o logout do usuário
  logout(): void {
    if(window.confirm('Deseja realmente sair do sistema?')) {
      //fazendo o logout do usuário
      this.authenticationHelper.signOut();
      //redirecionando de volta para a página de login
      window.location.href = "/account/login";
    }
  }

}
