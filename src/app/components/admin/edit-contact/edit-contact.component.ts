import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContatosService } from 'src/app/services/contatos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatosPutModel } from 'src/app/models/contatos/contatos-put.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {

  //variável do componente
  mensagem: string = '';

  //método construtor
  constructor(
    private activatedRoute: ActivatedRoute,
    private contatosService: ContatosService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    //capturando o id enviado pela URL
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //exibindo o spinner
    this.ngxSpinnerService.show();
    //acessando a API para consultar os dados do contato
    this.contatosService
      .getById(id)
      .subscribe({
        next: (data) => {
          //preencher os campos do formulário
          this.formEditContact.patchValue(data);
        },
      })
      .add(() => {
        this.ngxSpinnerService.hide();
      });
  }

  //estrutura do formulário
  formEditContact = new FormGroup({
    /* campo 'idContato' */
    idContato: new FormControl('', []),
    /* campo 'nome' */
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
    /* campo 'email' */
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    /* campo 'telefone' */
    telefone: new FormControl('', [
      Validators.required
    ]),
  });

  //função para executar as validações
  get form(): any {
    return this.formEditContact.controls;
  }

  //função para capturar o submit do formulário
  onSubmit(): void {

    //exibindo o componente spinner
    this.ngxSpinnerService.show();

    //capturar os dados que serão enviados para a edição
    const model: ContatosPutModel = {
      idContato: this.formEditContact.value.idContato as string,
      nome: this.formEditContact.value.nome as string,
      email: this.formEditContact.value.email as string,
      telefone: this.formEditContact.value.telefone as string
    };

    //fazendo a requisição de edição
    this.contatosService.put(model)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}', atualizado com sucesso.`;
        }
      }).add(() => {
        this.ngxSpinnerService.hide();
      })
  }
}
