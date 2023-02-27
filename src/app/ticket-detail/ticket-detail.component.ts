import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit{

  id!: number;
  ticket : any;

  constructor(private route : ActivatedRoute , private ticketService :TicketService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ;

      this.ticketService.getTicketById(this.id).subscribe(data => {
        this.ticket = data;
      });
    
  
  }

}
