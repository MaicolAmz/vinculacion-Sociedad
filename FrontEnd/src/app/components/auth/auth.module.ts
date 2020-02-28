import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './estudiantes/home/home.component';
import { InformeDetalleComponent } from './estudiantes/informe-detalle/informe-detalle.component';
import { IngresarInformeComponent } from './estudiantes/ingresar-informe/ingresar-informe.component';
import { InformeService } from 'src/app/service/informe.service';
import { AuthService } from 'src/app/service/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlockUIModule } from 'ng-block-ui';
import { ConveniosComponent } from './empresas/convenios/convenios.component';
import { DetalleComponent } from './empresas/detalle/detalle.component';
import { InformeAcademicoComponent } from './estudiantes/informe-academico/informe-academico.component';
import { EmpresaService } from 'src/app/service/empresa.service';
import { EditComponent } from './empresas/edit/edit.component';
import { VinculoComponent } from './empresas/vinculo/vinculo.component';
import { UserService } from 'src/app/service/user.service';
import { VinculadosComponent } from './empresas/vinculados/vinculados.component';
import { NoVinculadosComponent } from './empresas/no-vinculados/no-vinculados.component';
import { InformesComponent } from './empresas/informes/informes.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    InformeAcademicoComponent,
    InformeDetalleComponent,
    IngresarInformeComponent,
    ConveniosComponent,
    NavbarComponent,
    DetalleComponent,
    EditComponent,
    VinculoComponent,
    VinculadosComponent,
    NoVinculadosComponent,
    InformesComponent
  ],
  imports: [
    BlockUIModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [InformeService, AuthService, EmpresaService, UserService],

})
export class AuthModule { }
