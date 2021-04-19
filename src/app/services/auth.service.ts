import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { LoginData } from '../interfaces/login.interface';

import { User } from '../models/user.model';
import { TokenService } from './token.service';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly urlEntity: string = `login`;
  public activeUser: User;
  public auth2: any;
  public menu: any[];

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.googleInit();
  }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;
    return url;
  }

  get uid(): string {
    return this.activeUser._id || '';
  }

  get userRole() {
    return this.activeUser.role;
  }

  public googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '981247905213-lpi6b3beam5r6anbj77fl3qfq5v0qvad.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
    });
  }

  public login(formData: LoginData) {
    return this.http.post(this.baseUrl, formData).pipe(
      tap((res: any) => {
        this.menu = res.data.match.menu;
        if (formData.remindMe) {
          this.tokenService.setRemindedUser(formData.email)
        } else {
          this.tokenService.resetRemindedUser();
        }
        this.activeUser = new User(res.data.match.user);
        this.tokenService.setLoginData(res.data.token);
      })
    );
  }

  public loginGoogle(token: string) {
    return this.http.post(`${this.baseUrl}/google`, { token }).pipe(
      tap((res: any) => {
        this.menu = res.data.match.menu;
        this.activeUser = new User(res.data.match.user);
        this.tokenService.setLoginData(res.data.token);
      })
    );
  }

  public logout(): void {
    this.auth2.signOut().then(() => {
      this.tokenService.resetLoginData();
      this.activeUser = null;
      this.menu = [];
      console.log(`signedout`);
    });
  }

  public renewToken() {
    return this.http.get(`${this.baseUrl}/renew`, this.tokenService.header).pipe(
      tap((res: any) => {
        this.menu = res.data.match.menu;
        this.activeUser = new User(res.data.match.user);
        this.tokenService.setLoginData(res.data.token);
      }),
      map(res => true),
      catchError(err => {
        return of(err);
      })
    );
  }

  public updateUser(newData): void {
    this.activeUser.updateData(newData)
  }
}
