import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (!this.userService.hasToken()) {
      return this.router.navigateByUrl(`/login`);
    }
    return this.userService.renewToken().pipe(
      tap(isLogged => {

        if (!isLogged) {
          this.router.navigateByUrl(`/login`);
        }
      })
    )
  }
  
}
