import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { InformeService } from '../../../../service/informe.service';
import { AuthService } from 'src/app/service/auth.service';
import { JwtResponseI } from 'src/app/models/jwt-response';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Institucion } from 'src/app/models/instituciones';
import { EmpresaService } from 'src/app/service/empresa.service';
declare let alertify: any;

/*Event Html Input*/
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & HTMLSelectElement & EventTarget;
}

@Component({
  selector: 'app-ingresar-informe',
  templateUrl: './ingresar-informe.component.html',
  styleUrls: ['./ingresar-informe.component.css']
})
export class IngresarInformeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  tutores = [
    { id: '1', nombre: 'Juanito', apellido: 'Lopez' },
    { id: '2', nombre: 'Pepito', apellido: 'AAAa' },
    { id: '3', nombre: 'Maria', apellido: 'Bbbb' }
  ];
  convenio: Institucion = {
    _id: '',
    celular: '',
    nombre: '',
    direccion: '',
    representante: ''
  };
  informesAprobados = [];
  informesNoAprobados = [];
  informes = [];
  total: number;

  informeAcademico: FormGroup;
  hoy: string;
  estudiante: {
    id: '',
    nombre: '',
    apellido: '',
    idInstitucion: ''
  };
  file: File;
  fileSelected: string | ArrayBuffer;

  constructor(private informe: FormBuilder, private informeService: InformeService,
              private userService: AuthService, private empresaService: EmpresaService) {
    this.informeAcademico = this.informe.group({
      nombreProyecto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tutorAcademico: new FormControl('', [Validators.required]),
      archivoPath: new FormControl('', [Validators.required]),
      horas: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.hoyFecha();
    this.estudiante = JSON.parse(this.userService.getCurrentUser());
    this.empresaService.getInstitucion(this.estudiante.idInstitucion)
      .subscribe(
        res => {
          this.convenio = res;
        },
        err => {
          console.log(err);
        }
      );
    this.informeService.getInformes(this.estudiante.id)
      .subscribe(
        res => {
          this.informes = res;
          this.colocarAprobados();
          this.calcularProgreso();
        },
        err => console.log(err)
      );
  }
  calcularProgreso() {
    let total = 0;
    this.informesAprobados.forEach(element => {
      total += element.horas;
    });
    return this.total = total;
  }

  mensaje(): void {
    alertify
      .alert('Total de horas completadas', () => {
      alertify.success('OK');
      });
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

  archivoSubir(event) {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.file = <File> event.target.files[0];
    }
  }

  seleccionarTutor(tutorAcademico: HTMLSelectElement): string {
    let idTutor: string;
    this.tutores.forEach(element => {
      if ((element.nombre + ' ' + element.apellido) === tutorAcademico.value) {
        idTutor = element.id;
      }
    });
    return idTutor;
  }

  enviar(nombreProyecto: HTMLInputElement, tutorAcademico: HTMLSelectElement,
         horas: HTMLInputElement) {
    this.blockUI.start('Enviado Informe');
    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);
    const estadoAprobacion = 0;
    const tutor = this.seleccionarTutor(tutorAcademico);
    this.informeService
      .crearInforme(nombreProyecto.value, this.convenio._id, tutor, this.hoy, estadoAprobacion, horas.value, this.file, this.estudiante.id)
      .subscribe(
        res => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Informe Enviado Correctamente');
          this.informeAcademico.reset();
          this.quitarValidar();
        },
        err => {
          alertify.error('Error al Enviar el Informe');
        }
      );
    return false;
  }

  quitarValidar() {
    const forms = document.getElementsByClassName('needs-validation');
    // tslint:disable-next-line:only-arrow-functions
    Array.prototype.filter.call(forms, function(form) {
      form.classList.remove('was-validated');
    }, false);
  }

  hoyFecha() {
    const hoy = new Date();
    const dd = hoy.getDate();
    const mm = hoy.getMonth() + 1;
    const yyyy = hoy.getFullYear();
    return this.hoy = dd + '/' + mm + '/' + yyyy;
  }
}
