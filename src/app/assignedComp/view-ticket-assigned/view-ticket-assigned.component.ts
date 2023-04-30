import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/ticketService/ticket.service';

@Component({
  selector: 'app-view-ticket-assigned',
  templateUrl: './view-ticket-assigned.component.html',
  styleUrls: ['./view-ticket-assigned.component.css']
})
export class ViewTicketAssignedComponent {
  id!: number;
  ticket!: any;

  constructor(private route: ActivatedRoute, private ticketService: TicketService,private router: Router) {
    this.id = this.route.snapshot.params['id'];

    this.ticketService.getTicketById(this.id).subscribe(data => {
      console.log(data)
      this.ticket = data;
    });


  }
  ngOnInit(): void {

  }
  navigateToTicketList(){
    this.router.navigate(['assignedComp/ticket-list']);
  }
}
