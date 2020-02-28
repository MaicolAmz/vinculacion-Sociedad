import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlApi = 'http://localhost:4000/api';

  constructor( private http: HttpClient) { }

  getNoVinculados() {
    return this.http.get<User[]>(`${this.urlApi}/noVinculados`);
  }

  getVinculados(id: string) {
    return this.http.get<User[]>(`${this.urlApi}/vinculados/${id}`);
  }

  getVinculadosAll() {
    return this.http.get<User[]>(`${this.urlApi}/vinculados`);
  }

  vincularEstudiantes(id: string, updateEstudiantes: User) {
    return this.http.put(`${this.urlApi}/getEstudianteInforme/${id}`, updateEstudiantes);
  }

  getEstudiantes() {
    return this.http.get<User[]>(`${this.urlApi}/estudiantes`);
  }

  getEstudiante(id: string) {
    return this.http.get<User>(`${this.urlApi}/estudiantes/${id}`);
  }

}
