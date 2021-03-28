import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileFrom: FormGroup;
  public newPhoto: File;
  public previewImg: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
  }

  get currentUser() {
    return this.userService.activeUser;
  }

  ngOnInit(): void {
    this.profileFrom = this.fb.group({
      firstName: [this.currentUser.firstName, Validators.required],
      secondName: [this.currentUser.secondName],
      firstSurname: [this.currentUser.firstSurname, Validators.required],
      secondSurname: [this.currentUser.secondSurname],
      email: [this.currentUser.email, Validators.required],
      oldPassword: [''],
      newPassword: [''],
      role: [this.currentUser.role]
    });console.log(this);
  }

  showPreview() {
    const reader = new FileReader();
    reader.readAsDataURL(this.newPhoto);
    reader.onloadend = () => {
      this.previewImg = reader.result;
    }
  }

  updateProfile() {
    if (this.profileFrom.valid) {
      this.userService.updateProfile(this.profileFrom.value)
        .subscribe(
          (res) => {
            console.log('res: ', res);
            Swal.fire('Actualizado', `Sus datos fueron actualizados`, 'success');
          },
          (err) => {
            console.log('err: ', err);

          }
        );
    }
  }

  updateImage(file: File) {
    if (!file) {
      this.newPhoto = null
    }
    this.newPhoto = file;
    this.showPreview();
  }

  uploadImage() {
    this.fileUploadService
      .updatePhoto(this.newPhoto, 'users', this.userService.uid)
      .then(res => {
        this.userService.updateUser(res.data.updated);
      });
  }

}
