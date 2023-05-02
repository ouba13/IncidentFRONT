import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authService/auth.service';
import { Ticket } from 'src/app/ticket';
import { TicketService } from 'src/app/ticketService/ticket.service';

@Component({
  selector: 'app-ticket-list-assigned',
  templateUrl: './ticket-list-assigned.component.html',
  styleUrls: ['./ticket-list-assigned.component.css']
})
export class TicketListAssignedComponent {
  Tickets!: any;
  ticketSearched !: Ticket[];
  status: any[] = [];

  first = 0;
  rows = 10;

  dateInputValue: any = '';
  declarantInputValue: any = '';
  assignerInputValue: any = '';
  statusSelectValue: any = '';
  constructor(private ticketService: TicketService , private router : Router,private authser:AuthService) { }

  text = "";
  textAssign = "";
  results!: any;
  resultsAssign!: any[];

  userRole:  string  | null = this.authser.getUserRole();
   email =this.authser.getUserEmail();
  submitForm() {
    let filter: any = {where:[]};
    if (this.dateInputValue != "") {
      filter.where.push({
        field: 'creationdate',
        modalities: [this.dateInputValue]
      });
    }

    if (this.declarantInputValue != "") {
      filter.where.push({
        field: 'declarant',
        modalities: [this.declarantInputValue.firstname]
      });
    }

    if (this.assignerInputValue != "") {
      filter.where.push({
        field: 'assigne',
        modalities: [this.assignerInputValue.firstname]
      });
    }

    if (this.statusSelectValue != "") {
      filter.where.push({
        field: 'status',
        modalities: [this.statusSelectValue]
      });
    }

    console.log(filter)
    this.ticketService.search(filter).subscribe(
      data =>{
        this.Tickets = data,
        console.log(data)
      },
      error =>{
      console.log(error)
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
    console.log(event)
    this.text = event.id;
  }

  selectAssign(event: any) {
    console.log(event)
    this.textAssign = event.id;
  }

  ngOnInit(): void {
    this.getTickets();
    this.getStatus()
  }


  getTickets() {
    this.ticketService.getTicketByEmail(this.email).subscribe(
      data => {
        this.Tickets = data;
        if (this.Tickets.length === 0) {
          // Display a message to the user
          console.log("No incidents available for this user.");
        }
      },
      error => {
        console.log("Error in ticket ", error);
      }
    );
  }

  


  ticketSearch(tsearch: any) {
    const res: Ticket[] = [];
    for (const tick of this.Tickets) {
      const creationDateStr = tick.creationdate.toString(); // convert date to string
      if (creationDateStr.includes(tsearch) ||
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
   this.router.navigate(['assignedComp/view-ticket' , id]);
  }


  updateTicket(id:number){
    this.router.navigate(['assignedComp/update-ticket',id]);
  }

  resetIncidents(){
    return this.Tickets;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.Tickets ? this.first === (this.Tickets.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.Tickets ? this.first === 0 : true;
  }

  logout() {
    this.authser.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    location.reload();
  }

  getStatus(){
    this.authser.getStaus().subscribe(
      data =>{
        this.status = data
      }
    )
}
}
