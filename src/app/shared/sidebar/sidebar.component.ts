import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  get currentUser() {
    return this.authService.activeUser;
  }

  get items() {
    return this.sidebarService.menu;
  }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }

}
