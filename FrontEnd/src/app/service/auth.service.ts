import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = 'http://localhost:4000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;
  user = [{
    nombre: '',
    apellido: '',
  }];

  constructor(private httpClient: HttpClient) { }

  login(form: User): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.urlApi}/login`,
      form).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
            this.saveUser(res.dataUser);
          }
        }
      ));
  }

  logout() {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    localStorage.removeItem('User');
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  saveUser(miObjeto: any): void {
    localStorage.setItem('User', JSON.stringify(miObjeto));
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  getCurrentUser(): string {
    const user = localStorage.getItem('User');
    if (!isNullOrUndefined(user)) {
      return user;
    } else {
      return null;
    }
  }

}
