import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.isLoggedIn();
  
// };

@Injectable({
  providedIn: 'root'
})
class authGuard {

  constructor(private router: Router, private auth: AuthService, private toast: NgToastService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.auth.isLoggedIn()){
        return true;
      }
      else {
        this.router.navigate(['login'])
        this.toast.error({detail:"Error", summary:"Please login first!", duration:4000});
        return false;
      }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(authGuard).canActivate(next, state);
}