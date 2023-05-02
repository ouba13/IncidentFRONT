import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authService/auth.service';

@Component({
  selector: 'app-navbarassign',
  templateUrl: './navbarassign.component.html',
  styleUrls: ['./navbarassign.component.css']
})
export class NavbarassignComponent {
  constructor(private authser:AuthService,private router:Router){}
  logout() {
    this.authser.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    location.reload();
  }
  ToTicketList(){
    this.router.navigate(['/assignedComp/ticket-list']);
  }
}
