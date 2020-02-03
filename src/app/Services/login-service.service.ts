import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  appAccessToken = null;
  authenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
  baseUrl = 'https://localhost:44340/api/UserCredentails/getToken';
  constructor(private http: HttpClient) { }
  pushAuthenticate(value) {
    console.log('event catecjed', value);
    this.authenticated.emit(value);
  }
  getAppAccessToken(fbToken) {
    console.log('inside service', fbToken);
    const headerDict = {
      'Content-Type': 'application/json'
    };
    // tslint:disable-next-line:max-line-length
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
      responseType: 'text' as 'json'
    };
    const data = JSON.stringify(fbToken);
    return this.http.post(this.baseUrl, data, requestOptions);
  }
}
