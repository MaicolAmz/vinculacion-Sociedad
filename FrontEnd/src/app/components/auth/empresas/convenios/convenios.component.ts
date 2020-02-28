import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Institucion } from 'src/app/models/instituciones';

declare let alertify: any;


@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  convenios: FormGroup;

  constructor(private empresa: FormBuilder, private empresaService: EmpresaService) {
    this.convenios = this.empresa.group({
      representante: new FormControl('', [Validators.required, Validators.minLength(5)]),
      empresa: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  enviar(representante: string, nombre: string, direccion: string, celular: string) {
    this.blockUI.start('Enviado Empresa');
    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);
    this.empresaService.crearEmpresa({ representante, nombre, direccion, celular } as Institucion)
      .subscribe( res => {
        alertify.success('Empresa Ingresada Correctamente');
        this.convenios.reset();
        this.quitarValidar();
      }, err => {
        alertify.error('Error al Ingresar la Empresa');
      });
  }

  quitarValidar() {
    const forms = document.getElementsByClassName('needs-validation');
    // tslint:disable-next-line:only-arrow-functions
    Array.prototype.filter.call(forms, function(form) {
      form.classList.remove('was-validated');
    }, false);
  }

}
