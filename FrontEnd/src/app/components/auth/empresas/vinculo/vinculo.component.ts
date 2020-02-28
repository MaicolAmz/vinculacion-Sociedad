import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Institucion } from 'src/app/models/instituciones';

declare var alertify: any;

@Component({
  selector: 'app-vinculo',
  templateUrl: './vinculo.component.html',
  styleUrls: ['./vinculo.component.css'],
})
export class VinculoComponent implements OnInit {
  numero = 1;
  @Input() vinculados = [];
  noVinculados = [];
  @Input() idInstitucion: string;
  @Input() institucion: Institucion;

  constructor(private userService: UserService, private empresaService: EmpresaService ) {
  }

  ngOnInit() {
    this.getNoVinculados();
    this.getVinculados();
  }

  getNoVinculados() {
    this.userService.getNoVinculados()
      .subscribe(res => {
        this.noVinculados = res;
      }, err => {
        console.log(err);
      });
  }

  vincularEstudiante(id: string) {
    const idInstitucion = this.idInstitucion;
    this.userService.vincularEstudiantes(id, { idInstitucion } as unknown as User)
      .subscribe(res => {
        alertify.success('Estudiante Vinculado');
        this.getNoVinculados();
        this.getVinculados();
      }, err => {
        alertify.error('Error al Vincular Estudiante');
      });
  }

  devincular(id: string) {
    const idInstitucion = '0';
    this.userService.vincularEstudiantes(id, { idInstitucion } as unknown as User)
      .subscribe(res => {
        alertify.warning('Estudiante Desvinculado');
        this.getNoVinculados();
        this.getVinculados();
      }, err => {
        alertify.error('Error al Desvincular Estudiante');
      });
  }

  getVinculados(): void {
    this.userService.getVinculados(this.idInstitucion)
      .subscribe(res => {
        this.vinculados = res;
      }, err => {
        console.log(err);
      });
  }

}
