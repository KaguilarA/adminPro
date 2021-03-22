import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment, localData } from 'src/environments/environment';

import { LoginData } from '../interfaces/login.interface';
import { NewUserData } from '../interfaces/registerUser.interface';

const baseUrl = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient) {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '981247905213-lpi6b3beam5r6anbj77fl3qfq5v0qvad.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
    });
  }

  createUser(formData: NewUserData) {
    return this.http.post(`${baseUrl}user`, formData);
  }

  hasToken() {
    const currentToken = sessionStorage.getItem(localData.login);
    let hasToken = true;
    if (currentToken === null) {
      hasToken = false;
    }
    return hasToken;
  }

  login(formData: LoginData) {
    return this.http.post(`${baseUrl}login`, formData).pipe(
      tap((res: any) => {
        if (formData.remindMe) {
          localStorage.setItem(localData.remindMe, formData.email);
        } else {
          localStorage.removeItem(localData.remindMe);
        }
        sessionStorage.setItem(localData.login, res.data.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}login/google`, { token }).pipe(
      tap((res: any) => {
        sessionStorage.setItem(localData.login, res.data.token);
      })
    );
  }

  logout() {
    this.auth2.signOut().then(() => {
      sessionStorage.removeItem(localData.login);
      console.log(`signedout`);
    });
  }

  remindedUser() {
    let remindedUser = localStorage.getItem(localData.remindMe);
    if (remindedUser === null) {
      remindedUser = '';
    }
    return remindedUser;
  }

  renewToken(): any {
    const currentToken = sessionStorage.getItem(localData.login);

    return this.http.get(`${baseUrl}login/renew`, {
      headers: {
        'x-token': currentToken
      }
    }).pipe(
      tap((res: any) => {
        sessionStorage.setItem(localData.login, res.data.token);
      }),
      map(res => true),
      catchError(err => of(false))
    );
  }
}
