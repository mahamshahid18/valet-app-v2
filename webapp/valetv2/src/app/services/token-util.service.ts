import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenUtilService {

  url = null;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.serverBaseUrl;
  }

  getAuthHeader(token) {
    return {
      headers: new HttpHeaders({
        'authorization': token
      })
    };
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

  isTokenValid() {
    const tokenExists = this.checkTokenExists();
    if (!tokenExists) {
      this.router.navigateByUrl('/', { skipLocationChange: false });
    }

    const token = this.getToken();
    return this.http.get(`${this.url}/user/verify`, this.getAuthHeader(token))
      .pipe(
        catchError((err) => {
          this.router.navigateByUrl('/', { skipLocationChange: false });
          throw err;
        })
      );
  }
}
