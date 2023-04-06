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
      console.log(1)
    if (this.authService.isLoggedIn()) {
      console.log(2)

      console.info('Please Log In!');
      console.log(3)

      //this.router.navigate(['/logins']);
      console.log(4)

      return true;
    }
    // logged in, so return true
    //this.authService.isLoggedIn();
 
    console.log(5)
    return false;
  }
}

