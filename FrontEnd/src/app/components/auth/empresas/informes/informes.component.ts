import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { InformeService } from 'src/app/service/informe.service';
import { UserService } from 'src/app/service/user.service';
import { Informe } from 'src/app/models/informe';

declare var alertify: any;
declare var $: any;

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  actual = 1;
  informesAprobados = [];
  vinculados = [];
  noVinculados = [];
  convenios = [];
  total: {};
  @Input() informeEstudiante = [];
  @Input() estudiante: User;
  aprobados = [];
  noAprobados = [];
  @Input() idEstudiante: string;

  constructor(  private informeService: InformeService) { }

  ngOnInit(): void {
    this.informeService.getInformesAll().
      subscribe( res => {
        this.informesAprobados = res;
      }, err => {
        console.log(err);
      });
  }

  selectInformes(id: string): void {
    this.informeService.getInformes(id)
      .subscribe( res => {
        this.informeEstudiante = res;
        this.colocarAprobados();
      }, err => {
        console.log(err);
      });
  }

  colocarAprobados() {
    // tslint:disable-next-line:one-variable-per-declaration
    let i = 0, j = 0;
    this.informeEstudiante.forEach(element => {
      if (element.estadoAprobacion === 0) {
        this.noAprobados[i++] = element;
      } else {
        this.aprobados[j++] = element;
      }
    });
    // tslint:disable-next-line:no-unused-expression
    return this.aprobados, this.noAprobados;
  }

  aprobar(id: string): void {
    const estadoAprobacion = 1;
    this.informeService.updateEstado(id, { estadoAprobacion } as Informe)
      .subscribe( res => {
        alertify.success('Informe Aprobado Correctamente');
        this.informeService.getInformes(this.idEstudiante)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe( res => {
            this.informeEstudiante = res;
            this.colocarAprobados();
          }, err => {
            console.log(err);
          });
      }, err => {
        alertify.error('Error al aprobar el informe');
      });
  }

}
