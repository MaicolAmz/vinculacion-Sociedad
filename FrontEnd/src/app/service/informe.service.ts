import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Informe } from '../models/informe';
import { Institucion } from '../models/instituciones';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  urlApi = 'http://localhost:4000/api';
  urlApiOne = 'http://localhost:4000/api/getInforme';

  constructor( private http: HttpClient) { }

  crearInforme( nombreProyecto: string, convenio: string, tutorAcademico: string, fecha: string,
                estadoAprobacion: number, horas: string, file: File, idEstudiante: string) {
    const fd = new FormData();
    fd.append('nombreProyecto', nombreProyecto);
    fd.append('idConvenio', convenio);
    fd.append('idTutorAcademico', tutorAcademico);
    fd.append('fecha', fecha);
    fd.append('estadoAprobacion', estadoAprobacion.toString());
    fd.append('horas', horas);
    fd.append('file', file);
    fd.append('idEstudiante', idEstudiante);
    return this.http.post(`${this.urlApi}/obtenerDatos`, fd);
  }
  // Estudiantes
  getInformes(id: string) {
    return this.http.get<Informe[]>(`${this.urlApi}/getEstudianteInforme/${id}`);
  }
  // Intituciones
  getInstituciones() {
    return this.http.get<Institucion[]>(`${this.urlApi}/obtenerConvenios`);
  }

  getInformesAll() {
    return this.http.get<Institucion[]>(`${this.urlApi}/obtenerDatos`);
  }

  getInforme(id: string) {
    return this.http.get<Informe>(`${this.urlApiOne}/${id}`);
  }

  deleteInforme(id: string) {
    return this.http.delete(`${this.urlApiOne}/${id}`);
  }

  updateInforme(  id: string, nombreProyecto: string, convenio: string, tutorAcademico: string, fecha: string,
                  estadoAprobacion: number, horas: string, file: File, idEstudiante: string) {
    const fd = new FormData();
    fd.append('nombreProyecto', nombreProyecto);
    fd.append('idConvenio', convenio);
    fd.append('idTutorAcademico', tutorAcademico);
    fd.append('fecha', fecha);
    fd.append('estadoAprobacion', estadoAprobacion.toString());
    fd.append('horas', horas);
    fd.append('file', file);
    fd.append('idEstudiante', idEstudiante);
    return this.http.put(`${this.urlApiOne}/${id}`, fd);
  }

  updateEstado(id: string, estadoAprobacion: Informe) {
    return this.http.put(`${this.urlApi}/updateEstado/${id}`, estadoAprobacion);
  }

  cacularHora() {
    return this.http.get(`${this.urlApi}/calcular`);
  }

}
