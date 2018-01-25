import { AuthService } from './shared/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {       
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.getAuthState().map(
      (e) => {
        if (e) {
          return true;
        }
        }).catch(()=> {   
          this.router.navigate(['/login']);
          return Observable.of(false);
      });
    }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}