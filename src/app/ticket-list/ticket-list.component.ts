import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  Tickets!: Ticket[];
  constructor(private ticketService : TicketService) { }

  ngOnInit(): void {
    this.getTickets() ;
  }
  private getTickets() {
    this.ticketService.getTicketsList().subscribe(data => {
      this.Tickets = data ;
    });
  }

}
