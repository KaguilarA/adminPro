import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private userService: UserService
  ) { }

  async updatePhoto(
    photo: File,
    dataType: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${environment.base_url}upload/${dataType}/${id}`;
      const formData = new FormData();
      formData.append('photo', photo);
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.userService.token
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
