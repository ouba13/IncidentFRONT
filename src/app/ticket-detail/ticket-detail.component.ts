import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  id!: number;
  ticket!: any;

  constructor(private route: ActivatedRoute, private ticketService: TicketService,private router: Router) {
    this.id = this.route.snapshot.params['id'];

    this.ticketService.getTicketById(this.id).subscribe(data => {
      this.ticket = data;
    });


  }
  ngOnInit(): void {

  }
  navigateToTicketList(){
    this.router.navigate(['']);
  }
}
