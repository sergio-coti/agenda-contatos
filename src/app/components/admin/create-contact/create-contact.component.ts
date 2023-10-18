import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContatosPostModel } from 'src/app/models/contatos/contatos-post.model';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {

  //variável do componente
  mensagem: string = '';

  //construtor
  constructor(
    private contatosService: ContatosService,
    private ngxSpinnerService: NgxSpinnerService
  ){    
  }

  //estrutura do formulário
  formCreateContact = new FormGroup({
    /* campo 'nome' */
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)  
    ]),
    /* campo 'email' */
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    /* campo 'telefone' */
    telefone: new FormControl('', [
      Validators.required
    ])
  });

  //função para executar as validações
  get form(): any {
    return this.formCreateContact.controls;
  }

  //função para capturar o evento SUBMIT
  onSubmit(): void {

    this.ngxSpinnerService.show();

    const model: ContatosPostModel = {
      nome: this.formCreateContact.value.nome as string,
      email: this.formCreateContact.value.email as string,
      telefone: this.formCreateContact.value.telefone as string
    };

    this.contatosService.post(model)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}' cadastrado com sucesso!`
          this.formCreateContact.reset();
        },
        error: (e) => {
          this.mensagem = e.error;
        }
      }).add(() => {
        this.ngxSpinnerService.hide();
      });
  }

}
