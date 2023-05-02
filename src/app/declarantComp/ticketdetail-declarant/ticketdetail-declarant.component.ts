import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/ticketService/ticket.service';

@Component({
  selector: 'app-ticketdetail-declarant',
  templateUrl: './ticketdetail-declarant.component.html',
  styleUrls: ['./ticketdetail-declarant.component.css']
})
export class TicketdetailDeclarantComponent {
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
    this.router.navigate(['declarantComp/ticket-list']);
  }
}
