import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public readonly urlEntity: string = `upload`;

  constructor(
    private tokenService: TokenService
  ) { }

  get baseUrl(): string {
    const url: string = `${environment.base_url}${this.urlEntity}`;

    return url;
  }

  async updatePhoto(
    photo: File,
    dataType: 'user' | 'doctor' | 'hospital',
    id: string
  ) {
    try {
      const url = `${this.baseUrl}/${dataType}/${id}`;
      const formData = new FormData();
      formData.append('photo', photo);
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.tokenService.token
        },
        body: formData
      });
      const data = await result.json();
      return data;
    } catch (error) {
      console.error('error: ', error);
      return false
    }
  }
}
