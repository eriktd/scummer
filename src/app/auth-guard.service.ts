import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
    
    constructor(private authService: AuthService,
                private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('token')) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}
