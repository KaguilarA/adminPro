import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.model';

import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public rolesList: Role[] = [];

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) { }

  get currentUserRole(): any {
    return this.authService.userRole;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.roleService.getAllRoles().pipe(
      map((res: any) => {
        let isAdmin = false;
        let currentRole: Role;
        this.rolesList = res.data;
        for (let i: number = 0; i < this.rolesList.length; i++) {
          const role: Role = this.rolesList[i];
          if (role._id === this.currentUserRole._id) {
            currentRole = role;
          }
        }
        if (currentRole.id === 0) {
          isAdmin = true;
        } else {
          this.router.navigateByUrl(`/dashboard`)
        }
        return isAdmin;
      })
    );
    
  }
  
}
