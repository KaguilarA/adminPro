import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from "sweetalert2";

import { UserService } from 'src/app/services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [this.userService.remindedUser(), [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    remindMe: [this.validateRemindMe()]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.renderButton();
  }

  invalidField(field: string): boolean {
    if (this.loginForm.get(field).invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        resp => {
          this.ngZone.run(() => {
            this.router.navigateByUrl(`/dashboard`);
          });
        }, err => {
          Swal.fire('Error', err.error.msj, 'error');
        }
      );
      
    }
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'lontitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {

    this.userService.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const googleToken = googleUser.getAuthResponse().id_token;

        this.userService.loginGoogle(googleToken).subscribe(
          resp => {
            this.ngZone.run(() => {
              this.router.navigateByUrl(`/dashboard`);
            });
          }, err => {
            Swal.fire('Error', err.error.msj, 'error');
          }
        );
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  validateRemindMe() {
    let remindMe = false;
    if (this.userService.remindedUser() !== '') {
      remindMe = true;
    }
    return remindMe;
  }

}
