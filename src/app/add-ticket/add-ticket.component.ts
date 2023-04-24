import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent {
  constructor(private router: Router,private ticketService: TicketService ) {}
  ticket:any;


  onSubmit(){
    console.log(this.ticket);
    //this.saveTicket();
  }


  saveTicket(){
    this.ticketService.createTicket(this.ticket).subscribe(data => {
      console.log(data);
      this.goToTickeList();
    },
    error => console.log(error));
  }

  goToTickeList(){
    this.router.navigate(['']);
  }

  navigateToTicketList(){
    this.router.navigate(['']);
  }
}
