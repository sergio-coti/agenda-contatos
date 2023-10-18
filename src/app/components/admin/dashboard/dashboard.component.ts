import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  //variáveis do componente
  grafico: Chart = new Chart();
  tipo: string = 'bar';

  //método construtor
  constructor(
    private contatosService: ContatosService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  //evento executando quando o componente é renderizado
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.contatosService
      .getDashboard()
      .subscribe({
        next: (data) => {

          //dados do gráfico
          var dados = [];
          var nomes = [];

          for(var i = 0; i < data.length; i++) {
            dados.push([data[i].name, data[i].data]);
            nomes.push(data[i].name);
          }

          //desenhando o gráfico
          this.grafico = new Chart({
            chart: { type: this.tipo },
            title: { text: 'Quantidade de contatos cadastrados por data' },
            subtitle: { text: 'Formação Angular - COTI Informática' },
            series: [
              {
                data: dados,
                type: undefined as any,
              },
            ],
            xAxis: {
              categories: nomes,
            },
            legend: { enabled: false },
            credits: { enabled: false },
          });
        },
      })
      .add(() => {
        this.ngxSpinnerService.hide();
      });
  }
}
