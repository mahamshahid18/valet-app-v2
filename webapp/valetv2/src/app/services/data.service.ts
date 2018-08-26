import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.serverBaseUrl;
  }

  getAuthHeader(token) {
    return {
      headers: new HttpHeaders({
        'authorization': token
      })
    };
  }

  getUser(ticketNo, token) {
    return this.http.get(`${this.url}/user?ticket=${ticketNo}`,
      this.getAuthHeader(token));
  }

  updatePaymentStatus(ticketNo, token) {
    return this.http.patch(`${this.url}/user?ticket=${ticketNo}`,
      null, this.getAuthHeader(token));
  }

  getQrCode(ticketNo, token) {
    return this.http.get(`${this.url}/qrcode?ticket=${ticketNo}`,
      this.getAuthHeader(token));
  }
}
