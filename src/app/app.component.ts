import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IncidentApp';

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    !localStorage.getItem("token") ? this.router.navigate(['/login']) : null; 
  }


}
