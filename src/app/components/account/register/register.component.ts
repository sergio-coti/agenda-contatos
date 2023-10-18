import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CriarContaRequestModel } from 'src/app/models/usuarios/criarconta-request.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatchPasswordValidator } from 'src/app/validators/match-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  //variáveis do componente
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //construtor
  constructor(
    private usuariosService: UsuariosService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
  }

  //criando a estrutura do formulário
  formRegister = new FormGroup(
    {
      /* campo 'nome' */
      nome: new FormControl('', [
        Validators.required /* campo obrigatório */,
        Validators.minLength(8) /* mínimo de caracteres */,
        Validators.maxLength(100) /* máximo de caracteres */,
      ]),
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
      /* campo 'senhaConfirmacao' */
      senhaConfirmacao: new FormControl('', [
        Validators.required /* campo obrigatório */,
      ]),
    },
    /* adicionando validações customizadas */
    {
      validators: [MatchPasswordValidator.matchPassword],
    }
  );

  /*
      Função para permitir o acesso aos
      campos contidos no formulário
    */
  get form(): any {
    //retornar os campos do formulário
    return this.formRegister.controls;
  }

  /*
    Função para capturar o evento de SUBMIT
   */
  onSubmit(): void {
    
    this.ngxSpinnerService.show();

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const model: CriarContaRequestModel = {
      nome: this.formRegister.value.nome as string,
      email: this.formRegister.value.email as string,
      senha: this.formRegister.value.senha as string,
    };

    this.usuariosService.criarConta(model)
      .subscribe({
        next: (response) => { //resposta de sucesso
          this.mensagemSucesso = `Parabéns, ${response.nome}! Sua conta foi criada com sucesso.`;
          this.formRegister.reset(); //limpar o formulário
        },
        error: (e) => { //resposta de erro
          this.mensagemErro = e.error.message;
        }
      }).add(() => {
        this.ngxSpinnerService.hide();
      });
  }
}
