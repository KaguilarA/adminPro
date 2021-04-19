import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.tokenService.hasToken()) {
      return this.router.navigateByUrl(`/login`);
    }
    return this.authService.renewToken().pipe(
      tap(isLogged => {

        if (!isLogged) {
          this.router.navigateByUrl(`/login`);
        }
      })
    )
  }
  
}
