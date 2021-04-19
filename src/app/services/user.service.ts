import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { NewUserData } from '../interfaces/registerUser.interface';

import { User } from '../models/user.model';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly urlEntity: "user" = `user`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;

    return url;
  }

  public createUser(formData: NewUserData) {
    return this.http.post(this.baseUrl, formData).pipe(
      map((res: any) => {
        res.data = new User(res.data);
        return res;
      }),
      catchError((err) => {
        return of(err.error);
      })
    );
  }

  public deleteUser(userId) {
    const url = `${this.baseUrl}/${userId}`;
  
    return this.http.delete(url, this.tokenService.header);
  }

  public getAllUsers(fromOf: number = 0) {
    const url = `${this.baseUrl}?fromOf=${fromOf}`;

    return this.http.get(url, this.tokenService.header).pipe(
      map((res: any) => {
        res.data.users = Array.from(res.data.users, user => new User(user));
        return res;
      })
    );
  }

  public updateUser(newData: NewUserData, id: string) {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put(url, newData, this.tokenService.header).pipe(
      map((res: any) => {
        res.data = new User(res.data);
        return res;
      })
    );
  }
}
