import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';
import { AutenticarRequestModel } from 'src/app/models/usuarios/autenticar-request.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  //variáveis do componente
  mensagemErro: string = '';

  //método construtor
  constructor(
    //injeção de dependência
    private usuariosService: UsuariosService,
    private authenticationHelper: AuthenticationHelper,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  //criando a estrutura do formulário
  formLogin = new FormGroup({
    /* campo 'email' */
    email: new FormControl('', [
      Validators.required /* campo obrigatório */,
      Validators.email /* formato de email */,
    ]),
    /* campo 'senha' */
    senha: new FormControl('', [
      Validators.required /* campo obrigatório */,
      Validators.pattern(
        /* senha forte */
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  //função para permitir o acesso aos
  //campos contidos no formulário
  get form(): any {
    //retornar os campos do formulário
    return this.formLogin.controls;
  }

  //função executada no submit do formulário
  onSubmit(): void {
    this.ngxSpinnerService.show();

    const model: AutenticarRequestModel = {
      email: this.formLogin.value.email as string,
      senha: this.formLogin.value.senha as string,
    };

    this.usuariosService
      .autenticar(model)
      .subscribe({
        next: (response) => {
          //gravar os dados do usuário autenticado
          this.authenticationHelper.signIn(response);
          //redirecionar para a página de dashboard
          window.location.href = "/admin/dashboard";
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        },
      })
      .add(() => {
        this.ngxSpinnerService.hide();
      });
  }
}
