import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private userService: UserService,
    private http: HttpClient) { }
  
  getAllRoles(fromOf: number = 0) {
    const url = `${environment.base_url}role?fromOf=${fromOf}`;

    return this.http.get(url, this.userService.header).pipe(
      map((res: any) => {
        res.data = Array.from(res.data.matchs, role => new Role(role));
        return res;
      })
    );
  }
}
