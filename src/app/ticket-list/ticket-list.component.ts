import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  Tickets!: any;
  ticketSearched !: Ticket[];

  dateInputValue: any = '';
  declarantInputValue: any = '';
  assignerInputValue: any = '';
  statusSelectValue: any = '';
  constructor(private ticketService: TicketService , private router : Router) { }

  text = "";
  textAssign = "";
  results!: any;
  resultsAssign!: any[];


  submitForm() {
    let filter: any = {where:[]};

    if (this.dateInputValue != "") {
      filter.where.push({
        field: 'creationdate',
        operator: '=',
        modalities: [this.dateInputValue]
      });
    }

    if (this.declarantInputValue != "") {
      filter.where.push({
        field: 'declarant',
        operator: '=',
        modalities: [this.declarantInputValue.firstName]
      });
    }

    if (this.assignerInputValue != "") {
      filter.where.push({
        field: 'assigne',
        operator: '=',
        modalities: [this.assignerInputValue.firstName]
      });
    }

    if (this.statusSelectValue != "") {
      filter.where.push({
        field: 'status',
        operator: '=',
        modalities: [this.statusSelectValue]
      });
    }

    console.log(filter)
    this.ticketService.search(filter).subscribe(
      data => this.Tickets = data,
      error => console.error(error)
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



  getTickets() {
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

  viewTicketDetail(id : number){
   this.router.navigate(['ticketInfo' , id]);
  }

  updateTicket(id:number){

  }

  resetIncidents(){
    return this.Tickets;
  }



}
