import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const userRole = localStorage.getItem('role'); // Get user role from local storage
      
    if (userRole === 'Assigned') {
      this.router.navigate(['/assignedComp/ticket-list']); // Redirect to assigned ticket list component
      return true;
    }
    else if (userRole === 'Declarant') {
      this.router.navigate(['/declarantComp/ticket-list']); // Redirect to declarant ticket list component
      return true;
    }
    else {
      this.router.navigate(['/login']); // Redirect to login page if user role is not recognized
      return false;
    }
  }
  
}
