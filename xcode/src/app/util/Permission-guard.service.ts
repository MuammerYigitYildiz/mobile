import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // @ts-ignore
    if (route && route.data && route.data.permissions && route.data.permissions.length > 0) {
      // @ts-ignore
      const permissions = route.data.permissions as Array<string>;
      if (this.authenticationService.isAuthenticated() && this.authenticationService.hasAnyPermission(permissions)) {
        return true;
      }
    }
    this.router.navigate(['auth/login']);
    return false;
  }

}
