import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
     {

    if (this.authService.isLoggedIn()) {
      //this.router.navigate(['/logins']);
      return true;
    }
    // logged in, so return true
    //this.authService.isLoggedIn();
    return false;
  }
}

