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
  ticketSearched !: Ticket[];

  dateInputValue: string = '';
  declarantInputValue: string = '';
  assignerInputValue: string = '';
  statusSelectValue: string = '';
  constructor(private ticketService: TicketService) { }

  text = "";
  textAssign = "";
  results!: any[];
  resultsAssign!: any[];

  submitForm(form: any) {
    this.ticketService.submitForm(form).subscribe(
      response => {
        console.log(response)       //respone  =  feha el object eli fih donnes je mel backend
      }
    );
  }
  search(event: any) {
    this.ticketService.getUsers(event.query).then(data => {
      this.results = data;
    });
  }

  searchAssign(event: any) {
    this.ticketService.getAssigned(event.query).then(data => {
      this.resultsAssign = data;
    });
  }



  select(event: any) {
    this.text = event.user_id;
  }

  selectAssign(event: any) {
    this.textAssign = event.user_id;
  }

  ngOnInit(): void {
    this.getTickets();

  }



  private getTickets() {
    this.ticketService.getTicketsList().subscribe(data => {
      this.Tickets = data;
    });
  }


  ticketSearch(tsearch: any) {
    const res: Ticket[] = [];
    for (const tick of this.Tickets) {
      const creationDateStr = tick.creationdate.toString(); // convert date to string
      if (creationDateStr.includes(tsearch) ||
        tick.assigne.toLowerCase().includes(tsearch.toLowerCase()) ||
        tick.declarant.toLowerCase().includes(tsearch.toLowerCase()) ||
        tick.status.toLowerCase().includes(tsearch.toLowerCase())) {
        res.push(tick);
      }
    }
    this.Tickets = res;
    if (res.length === 0 || !tsearch) {
      this.getTickets();
    }
  }




}
