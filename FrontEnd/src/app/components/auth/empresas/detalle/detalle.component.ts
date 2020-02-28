import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/service/empresa.service';
import { UserService } from 'src/app/service/user.service';
import { Institucion } from 'src/app/models/instituciones';
import { User } from 'src/app/models/user';
declare let alertify: any;


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  num = 1;
  empresas = [];
  estudiantes = [];
  idEmpresa: string;
  empresa: Institucion;

  constructor(private empresaService: EmpresaService, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.empresaService.getInstituciones()
      .subscribe(res => {
        this.empresas = res;
      }, err => {
        console.log(err);
      });
  }

  deleteEmpresa(id: string): void {
    alertify.confirm('Desea eliminar la Institución?',
      () => {
        alertify.success('Ok');
        this.userService.getVinculados(id)
          .subscribe(res => {
            this.estudiantes = res;
            this.estudiantes.forEach(element => {
              const idInstitucion = '0';
              this.userService.vincularEstudiantes( element._id, { idInstitucion } as unknown as User)
                // tslint:disable-next-line:no-shadowed-variable
                .subscribe( res => {}, err => {
                  console.log(err);
                });
            });
            alertify.warning('Estudiantes Eliminados');
          }, err => {
            console.log(err);
          });
        this.empresaService.deleteInstitucion(id)
          .subscribe(res => {
            alertify.success('Empresa Borrada con exito');
            window.setTimeout('document.location.reload()', 1000);
        }, err => {
          alertify.error('Error al Borrar la empresa');
        });
      },
      () => {
        alertify.error('Cancel');
      });
  }

  editEmpresa(id: string): void {
    this.router.navigate(['/auth/updateEmpresa', id]);
  }

  selectVinculados(id: string): void {
    this.userService.getVinculados(id)
      .subscribe(res => {
        this.estudiantes = res;
      }, err => {
        console.log(err);
      });
  }

  selectEmpresa(id: string): void {
    this.idEmpresa = id;
    this.empresaService.getInstitucion(id)
      .subscribe(res => {
        this.empresa = res;
      }, err => {
        console.log(err);
      });
  }
}
