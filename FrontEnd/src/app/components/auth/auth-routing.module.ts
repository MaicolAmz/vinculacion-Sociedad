import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresarInformeComponent } from './estudiantes/ingresar-informe/ingresar-informe.component';
import { InformeDetalleComponent } from './estudiantes/informe-detalle/informe-detalle.component';
import { HomeComponent } from './estudiantes/home/home.component';
import { ConveniosComponent } from './empresas/convenios/convenios.component';
import { DetalleComponent } from './empresas/detalle/detalle.component';
import { InformeAcademicoComponent } from './estudiantes/informe-academico/informe-academico.component';
import { EditComponent } from './empresas/edit/edit.component';
import { VinculadosComponent } from './empresas/vinculados/vinculados.component';
/*Componente*/




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'informesAcademicos', component: InformeAcademicoComponent },
  { path: 'convenios', component: ConveniosComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'ingresarInformeE', component: IngresarInformeComponent},
  { path: 'updateInformeE/:id', component: InformeDetalleComponent},
  { path: 'updateEmpresa/:id', component: EditComponent},
  { path: 'informe', component: VinculadosComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
