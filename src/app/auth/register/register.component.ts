import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from "sweetalert2";

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    firstName: ['Test', Validators.required],
    secondName: [''],
    firstSurname: ['test', Validators.required],
    secondSurname: [''],
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['test123', [Validators.required, Validators.minLength(4)]],
    password2: ['test123', [Validators.required, Validators.minLength(4)]],
    terms: [false, Validators.required],
    role: ['60696b068aafeb51e0f16294']
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  configmPassword() {
    const pass1 = this.registerForm.get(`password`).value;
    const confirm = this.registerForm.get(`password2`).value;

    if ((pass1 !== confirm) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe(
        resp => {
          if (resp.state) {
            console.log(resp);
          } else {
            Swal.fire(resp.msj, resp.errors.message, 'error');
          }
        }
      );
    }
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

}
