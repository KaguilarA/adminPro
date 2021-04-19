import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

import { Hospital } from '../models/hospital.model';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public readonly urlEntity: string = `search`;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;

    return url;
  }

  search(type: string, term: string) {
    const url = `${this.baseUrl}/bycollection/${type}/${term}`;
    return this.http.get(url, this.tokenService.header).pipe(
      map((res: any) => Array.from(res.data.result, item => {
        let data;
        switch (type) {
          
          case `hospital`:
            data = new Hospital(item);
            break;
          
          case `role`:
            data = new Role(item);
            break;
          
          case `doctor`:
            data = new Doctor(item);
            break;
          
          default:
            data = new User(item);
            break;
        }
        return data;
      }))
    );
  }
}
