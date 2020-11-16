import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.isLogged();
        if (currentUser) {
            return true;
        } else {
            this.alertService.launchAlert('Please login!', 'Press "OK" to continue.', 'warning');
            this.router.navigate(['/account']);
            return false;
        }
    }
}
