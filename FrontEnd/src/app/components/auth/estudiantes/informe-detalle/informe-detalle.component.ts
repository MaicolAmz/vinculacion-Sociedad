import { Component, OnInit, Input } from '@angular/core';
import { InformeService } from 'src/app/service/informe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Informe } from 'src/app/models/informe';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/service/auth.service';
import { JwtResponseI } from 'src/app/models/jwt-response';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Institucion } from 'src/app/models/instituciones';

/*Event Html Input*/
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & HTMLSelectElement & EventTarget;
}

declare let alertify: any;

@Component({
  selector: 'app-informe-detalle',
  templateUrl: './informe-detalle.component.html',
  styleUrls: ['./informe-detalle.component.css']
})
export class InformeDetalleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() total: number;
  tutores = [
    {id: '1', nombre: 'Juanito', apellido: 'Lopez'},
    {id: '2', nombre: 'Pepito', apellido: 'AAAa'},
    {id: '3', nombre: 'Maria', apellido: 'Bbbb'}
  ];

  convenio: Institucion = {
    _id: '',
    celular: '',
    nombre: '',
    direccion: '',
    representante: ''
  };

  informeAcademico: FormGroup;
  recuperarInforme: Informe;
  id: string;
  hoy: string;
  estudiante: {
    id: '',
    nombre: '',
    apellido: '',
    idInstitucion: ''
  };
  informes = [];
  informesNoAprobados = [];
  informesAprobados = [];

  file: File;
  fileSelected: string | ArrayBuffer;

  constructor(  private informe: FormBuilder, private informeService: InformeService,
                private router: Router, private activeRouter: ActivatedRoute,
                private userService: AuthService, private empresaService: EmpresaService ) {
      this.informeAcademico = this.informe.group({
        nombreProyecto: new FormControl('', [Validators.required, Validators.minLength(3)]),
        tutorAcademico: new FormControl('', [Validators.required]),
        archivoPath: new FormControl('', [Validators.required]),
        horas: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.id = params.id;
      this.informeService.getInforme(this.id)
      .subscribe(
        res => {
          this.recuperarInforme = res;
        },
        err => console.log(err)
      );
    });
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

  mensaje(): void {
    alertify
      .alert('Total de horas completadas', () => {
      alertify.success('OK');
      });
  }

  archivoSubir(event) {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.file = <File> event.target.files[0];
    }
  }

  seleccionarTutor(tutorAcademico: HTMLSelectElement): string {
    let tutor: string;
    this.tutores.forEach(element => {
      if ((element.nombre + ' ' + element.apellido) === tutorAcademico.value) {
        tutor = element.id;
      }
    });
    return tutor;
  }

  quitarValidar() {
    const forms = document.getElementsByClassName('needs-validation');
    // tslint:disable-next-line:only-arrow-functions
    Array.prototype.filter.call(forms, function(form) {
      form.classList.remove('was-validated');
      }, false);
  }

  update( nombreProyecto: HTMLInputElement,
          tutorAcademico: HTMLSelectElement, horas: HTMLInputElement) {
    this.blockUI.start('Actualizando Informe');
    const estadoAprobacion = 0;
    const tutor = this.seleccionarTutor(tutorAcademico);
    setTimeout(()  => {
      this.informeService
      .updateInforme( this.id, nombreProyecto.value, this.convenio._id, tutor, this.hoy,
                      estadoAprobacion, horas.value, this.file, this.estudiante.id)
      .subscribe(
        res => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Informe Actualizado Correctamente');
          this.router.navigate(['/auth/informesAcademicos']);
        },
        err => {
          alertify.error('Error al Actualizar el Informe');
        }
      );
      this.blockUI.stop();
    }, 1000);
  }

  hoyFecha() {
    const hoy = new Date();
    const dd = hoy.getDate();
    const mm = hoy.getMonth() + 1;
    const yyyy = hoy.getFullYear();
    return this.hoy = dd + '/' + mm + '/' + yyyy;
  }
}
