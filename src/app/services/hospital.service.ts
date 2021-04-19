import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { NewHospitalData } from '../interfaces/registerHospital.interface';
import { Hospital } from "./../models/hospital.model";

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  public readonly urlEntity: "hospital" = `hospital`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;
    return url;
  }

  public createHospital(formData: NewHospitalData) {
    return this.http.post(this.baseUrl, formData, this.tokenService.header).pipe(
      map((res: any) => {
        res.data = new Hospital(res.data);
        return res;
      })
    );
  }

  public deleteHospital(id) {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, this.tokenService.header);
  }

  public getAllHospitals(fromOf: number = 0) {
    const url = `${this.baseUrl}?fromOf=${fromOf}`;

    return this.http.get(url, this.tokenService.header).pipe(
      map((res: any) => {
        res.data.hospitals = Array.from(res.data.hospitals,
          (hospital) => new Hospital(hospital));
        return res.data;
      })
    );
  }

  public updateHospital(newData: NewHospitalData, id: string) {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put(url, newData, this.tokenService.header).pipe(
      map((res: any) => {
        res.data = new Hospital(res.data);
        return res;
      })
    );
  }
}
