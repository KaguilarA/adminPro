import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  get currentUser() {
    return this.authService.activeUser;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }

}
