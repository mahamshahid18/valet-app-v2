import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

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
    return this.http.post(`${this.url}/authorize/user`, body)
      .pipe(
        catchError((err) => { throw err; })
      );
  }

  loginValet(uname, pwd) {
    const body = {
      uname,
      pwd: Md5.hashStr(pwd)
    };
    return this.http.post(`${this.url}/authorize/valet`, body)
      .pipe(
        catchError((err) => { throw err; })
      );
  }

}
