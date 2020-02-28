import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/service/informe.service';
import { UserService } from 'src/app/service/user.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { User } from 'src/app/models/user';
import { Informe } from 'src/app/models/informe';

declare var alertify: any;
declare var $: any;

@Component({
  selector: 'app-vinculados',
  templateUrl: './vinculados.component.html',
  styleUrls: ['./vinculados.component.css']
})
export class VinculadosComponent implements OnInit {
  page = 1;
  informesAprobados = [];
  vinculados = [];
  convenios = [];
  total = [] as any;
  informeEstudiante = [];
  estudiante: User;
  idEstudiante: string;

  constructor(  private informeService: InformeService, private userService: UserService,
                private convenioService: EmpresaService) { }

  ngOnInit(): void {
    this.informeService.getInformesAll().
      subscribe( res => {
        this.informesAprobados = res;
      }, err => {
        console.log(err);
      });
    this.userService.getVinculadosAll()
    .subscribe( res => {
      this.vinculados = res;
      this.informeService.cacularHora()
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe( res => {
          this.total = res;
        });
    }, err => {
      console.log(err);
    });
    this.convenioService.getInstituciones()
      .subscribe( res => {
        this.convenios = res;
      }, err => {
        console.log(err);
      });
  }

  selectInformes(id: string): void {
    this.informeService.getInformes(id)
      .subscribe( res => {
        this.informeEstudiante = res;
      }, err => {
        console.log(err);
      });
  }

  selectEstudiante(id: string): void {
    this.idEstudiante = id;
    this.userService.getEstudiante(id)
      .subscribe( res => {
        this.estudiante = res;
      }, err => {
        console.log(err);
      });
  }

}
