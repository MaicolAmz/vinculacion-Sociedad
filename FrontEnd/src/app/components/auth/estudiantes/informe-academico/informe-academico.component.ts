import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';
import { AuthService } from 'src/app/service/auth.service';
import { JwtResponseI } from 'src/app/models/jwt-response';
import { InformeService } from 'src/app/service/informe.service';

declare let alertify: any;

@Component({
  selector: 'app-informe-academico',
  templateUrl: './informe-academico.component.html',
  styleUrls: ['./informe-academico.component.css']
})
export class InformeAcademicoComponent implements OnInit {
  informes = [];
  informesAprobados = [];
  informesNoAprobados = [];
  total: number;
  estudiante: JwtResponseI;
  convenios = [];
  pagina = 1;

  constructor(private informeService: InformeService, private router: Router,
              private userService: AuthService) { }

  ngOnInit() {
    this.estudiante = JSON.parse(this.userService.getCurrentUser());
    this.informeService.getInformes(this.estudiante.id)
      .subscribe(
        res => {
          this.informes = res;
          this.colocarAprobados();
          this.calcularProgreso();
        },
        err => console.log(err)
      );
    this.informeService.getInstituciones()
        .subscribe(
          res => {
            this.convenios = res;
          },
          err => {
            console.log(err);
          }
        );
  }

  colocarAprobados() {
    // tslint:disable-next-line:one-variable-per-declaration
    let i = 0, j = 0;
    this.informes.forEach(element => {
      if (element.estadoAprobacion === 0) {
        this.informesNoAprobados[i++] = element;
      } else {
        this.informesAprobados[j++] = element;
      }
    });
    // tslint:disable-next-line:no-unused-expression
    return this.informesAprobados, this.informesNoAprobados;
  }

  selectInforme(id: string) {
    this.router.navigate(['/auth/updateInformeE', id]);
  }

  deleteInforme(id: string) {
    // tslint:disable-next-line:only-arrow-functions
    alertify.confirm('Estas apunto de Borrar tu Informe.', () => {
      this.informeService.deleteInforme(id)
        .subscribe(
          res => {
            window.setTimeout('document.location.reload()', 1000);
            alertify.success('Informe Borrado Correctamente');
          },
          err => alertify.error('Error al Borra el Informe')
        );
    },
      // tslint:disable-next-line:only-arrow-functions
      function() {
        alertify.error('Cancelar');
      });
  }

  calcularProgreso() {
    let total = 0;
    this.informesAprobados.forEach(element => {
      total += element.horas;
    });
    const ctx = document.getElementById('myChart');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [160, total],
          backgroundColor: ['#FFD700', '#7CFC00'],
        }],
        labels: ['Total de Horas', 'Progreso']
      },
      options: { responsive: true }
    });
    return this.total = total;
  }

}
