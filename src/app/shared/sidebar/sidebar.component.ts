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
  items: any[];

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.items = sidebarService.menu;
    console.log(this.items)
  }

  get currentUser() {
    return this.authService.activeUser;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }

}
