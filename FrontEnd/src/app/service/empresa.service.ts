import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Informe } from '../models/informe';
import { Institucion } from '../models/instituciones';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  urlApi = 'http://localhost:4000/api';

  constructor( private http: HttpClient) { }

  crearEmpresa( newEmpresa: Institucion) {
    return this.http.post(`${this.urlApi}/obtenerConvenios`, newEmpresa);
  }

  // Intituciones
  getInstituciones() {
    return this.http.get<Institucion[]>(`${this.urlApi}/obtenerConvenios`);
  }

  getInstitucion(id: string) {
    return this.http.get<Institucion>(`${this.urlApi}/convenio/${id}`);
  }

  deleteInstitucion(id: string) {
    return this.http.delete(`${this.urlApi}/convenio/${id}`);
  }

  updateInstitucion( id: string,  updateEmpresa: Institucion) {
    return this.http.put(`${this.urlApi}/convenio/${id}`, updateEmpresa);
  }

}
