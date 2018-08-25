import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.serverBaseUrl;
  }

  loginUser(ticket_no, phone, reg_no) {
    const body = {
      ticket_no,
      phone,
      reg_no
    };
    return this.http.post(`${this.url}/authorize`, body)
      .pipe(
        catchError((err) => { throw err; })
      );
  }

  loginValet() {
    // TODO: implement valet login logic
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkTokenExists() {
    const token = localStorage.getItem('token');
    return ((token !== null) && (token !== undefined));
  }

}
