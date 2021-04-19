import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { NewDoctorData } from './../interfaces/registerDoctor.interface';
import { Doctor } from "./../models/doctor.model";

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  public readonly urlEntity: "doctor" = `doctor`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;
    return url;
  }

  public createDoctor(formData: NewDoctorData) {
    console.log('formData: ', formData);
    return this.http.post(this.baseUrl, formData, this.tokenService.header).pipe(
      map((res: any) => {
        console.log('res: ', res);
        res.data = new Doctor(res.data);
        return res;
      })
    );
  }

  public deleteDoctor(id) {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, this.tokenService.header);
  }

  public getAllDoctors(fromOf: number = 0) {
    const url = `${this.baseUrl}?fromOf=${fromOf}`;

    return this.http.get(url, this.tokenService.header).pipe(
      map((res: any) => {
        console.log('res: ', res);
        res.data.doctors = Array.from(res.data.doctors,
          (doctor) => new Doctor(doctor));
        return res.data;
      })
    );
  }

  public updateDoctor(newData: NewDoctorData, id: string) {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put(url, newData, this.tokenService.header).pipe(
      map((res: any) => {
        res.data = new Doctor(res.data);
        return res;
      })
    );
  }
}
