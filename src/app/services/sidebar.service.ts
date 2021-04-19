import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(
    private authService: AuthService
  ) { }

  get menu() {
    return this.authService.menu;
  }
}
