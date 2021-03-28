import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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
    private userService: UserService,
    private router: Router
  ) {
    this.items = sidebarService.menu;
    console.log(this.items)
  }

  get currentUser() {
    return this.userService.activeUser;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl(`/`);
  }

}
