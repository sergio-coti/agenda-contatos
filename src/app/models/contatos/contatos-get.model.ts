/*
    Modelo de dados para a resposta
    GET de consulta de contatos
*/
export class ContatosGetModel {
  idContato: string = '';
  nome: string = '';
  email: string = '';
  telefone: string = '';
  dataCriacao: Date | null = null;
  idUsuario: string = '';
}
