import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContatosGetModel } from 'src/app/models/contatos/contatos-get.model';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
})
export class ListContactsComponent implements OnInit {

  //variáveis do componente
  contatos: ContatosGetModel[] = [];
  contato: ContatosGetModel = new ContatosGetModel();
  pagina: number = 1;
  mensagem: string = '';

  //construtor
  constructor(
    private contatosService: ContatosService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  //evento executado quando o componente é renderizado
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.contatosService
      .getAll()
      .subscribe({
        next: (data) => {
          this.contatos = data;
        },
        error: (e) => {
          console.log(e.error);
        },
      })
      .add(() => {
        this.ngxSpinnerService.hide();
      });
  }

  //função utilizada pelo paginador
  pageChange(event: any): void {
    this.pagina = event;
  }

  //função para capturar o evento click
  //no botão de exclusão
  onDelete(contato: ContatosGetModel): void {
    this.contato = contato;
  }

  //função para executar a exclusão
  //do contato após a confirmação
  onDeleteConfirm(): void {
    this.ngxSpinnerService.show();
    //realizando a exclusão do contato
    this.contatosService.delete(this.contato.idContato)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}', excluído com sucesso.`;
          this.ngOnInit();
        }
      }).add(() => {
        this.ngxSpinnerService.hide();
      })
  }
}
