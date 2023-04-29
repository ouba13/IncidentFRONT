import { Component } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-a',
  templateUrl: './sidebar-a.component.html',
  styleUrls: ['./sidebar-a.component.css']
})
export class SidebarAComponent {

  constructor(private authser:AuthService,private router:Router){}

  logout() {
    this.authser.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    location.reload();
  }
}
