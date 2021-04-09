import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalImage: ModalImageService
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

  openModal() {
    this.modalImage.showModal(this.currentUser, `users`);
  }

}
