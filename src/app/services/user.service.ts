import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment, localData } from 'src/environments/environment';

import { LoginData } from '../interfaces/login.interface';
import { ProfileData } from '../interfaces/profile.interface';
import { NewUserData } from '../interfaces/registerUser.interface';
import { User } from '../models/user.model';

const baseUrl = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public activeUser: User;
  public auth2: any;

  constructor(private http: HttpClient) {
    this.googleInit();
  }

  get header() {
    const header = {
      headers: {
        'x-token': this.token
      }
    }
    return header;
  }

  get uid() {
    return this.activeUser._id || '';
  }

  get token() {
    const currentToken = sessionStorage.getItem(localData.login);
    return currentToken;
  }

  createUser(formData: NewUserData) {
    return this.http.post(`${baseUrl}user`, formData);
  }

  deleteUser(userId) {
    const url = `${environment.base_url}user/${userId}`;
    return this.http.delete(url, this.header);
  }

  getAllUsers(fromOf: number = 0) {
    const url = `${environment.base_url}user?fromOf=${fromOf}`;

    return this.http.get(url, this.header).pipe(
      map((res: any) => {
        res.data.users = Array.from(res.data.users, user => new User(user));
        return res;
      })
    );
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '981247905213-lpi6b3beam5r6anbj77fl3qfq5v0qvad.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
    });
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
        this.activeUser = new User(res.data.user);
        sessionStorage.setItem(localData.login, res.data.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}login/google`, { token }).pipe(
      tap((res: any) => {
        this.activeUser = new User(res.data.user);
        sessionStorage.setItem(localData.login, res.data.token);
      })
    );
  }

  logout() {
    this.auth2.signOut().then(() => {
      sessionStorage.removeItem(localData.login);
      this.activeUser = null;
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
    return this.http.get(`${baseUrl}login/renew`, this.header).pipe(
      tap((res: any) => {
        this.activeUser = new User(res.data.user);
        sessionStorage.setItem(localData.login, res.data.token);
      }),
      map(res => true),
      catchError(err => {
        return of(err);
      })
    );
  }

  updateProfile(profileData: ProfileData) {
    return this.http.put(`${baseUrl}user/${this.uid}`, profileData, this.header);
  }

  updateUser(newData) {
    this.activeUser.updateData(newData)
  }
}
