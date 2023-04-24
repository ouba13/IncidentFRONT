import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible!: boolean;
  constructor(private router:Router, private authser:AuthService){}
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.authser.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    location.reload();
  }
}
