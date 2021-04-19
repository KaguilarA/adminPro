import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { Role } from '../models/role.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public readonly urlEntity: string = `role`;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;

    return url;
  }
  
  getAllRoles(fromOf: number = 0) {
    const url = `${this.baseUrl}?fromOf=${fromOf}`;

    return this.http.get(url, this.tokenService.header).pipe(
      map((res: any) => {
        res.data = Array.from(res.data.matchs, role => new Role(role));
        return res;
      })
    );
  }
}
