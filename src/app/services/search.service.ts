import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  search(type: string, term: string) {
    const url = `${environment.base_url}search/bycollection/${type}/${term}`;
    return this.http.get(url, this.userService.header).pipe(
      map((res: any) => Array.from(res.data.result, item => {
        let data;
        switch (type) {
          // case `hospital`:
          //   new User(item);
          //   break;
          
          // case `doctor`:
          //   new User(item);
          //   break;
          
          default:
            data = new User(item);
            break;
        }
        return data;
      }))
    );
  }
}
