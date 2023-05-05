import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../authService/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  Tickets!: any;
  ticketSearched !: Ticket[];
  status: any[] = [];

  first = 0;
  rows = 10;

  dateInputValue: any = '';
  declarantInputValue: any = '';
  assignerInputValue: any = '';
  statusSelectValue: any = '';
  email = this.authser.getUserEmail();
  constructor(private ticketService: TicketService, private router: Router, private authser: AuthService) { }

  text = "";
  textAssign = "";
  results!: any;
  resultsAssign!: any[];

  userRole: string | null = this.authser.getUserRole();

  submitForm() {
    if (!this.dateInputValue && !this.declarantInputValue && !this.assignerInputValue && !this.statusSelectValue) {
      Swal.fire({
        title: 'No search criteria selected',
        text: 'Please select at least one search criteria',
        icon: 'error'
      });
      return;
    }
    let filter: any = { where: [] };
    if (this.dateInputValue != "") {
      const selectedDate = new Date(this.dateInputValue);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        Swal.fire({
          title: 'Invalid date',
          text: 'Please select a date that is not greater than the current system date.',
          icon: 'error'
        });
        return;
      }
      filter.where.push({
        field: 'creationdate',
        modalities: [this.dateInputValue]
      });
    }

    if (this.declarantInputValue != "") {

      filter.where.push({
        field: 'declarant',
        modalities: [this.declarantInputValue?.firstname]
      });

    }

    if (this.assignerInputValue != "") {
      filter.where.push({
        field: 'assigne',
        modalities: [this.assignerInputValue?.firstname]
      });
    }

    if (this.statusSelectValue != "") {
      filter.where.push({
        field: 'status',
        modalities: [this.statusSelectValue]
      });
    }

    console.log(filter)
    if (this.userRole == 'Admin') {
      this.ticketService.adminSearch(filter).subscribe(
        data => {
          this.Tickets = data,
            console.log(data)
        },
        error => {
          if (error.error === "No incidents found matching the search criteria") {
            Swal.fire({
              title: 'No incidents found',
              text: 'There are no incidents matching the search criteria.',
              icon: 'info'
            });
          } else {
            console.log(error)
          }
        }
      );
    } else {
      this.ticketService.search(filter, this.email).subscribe(
        data => {
          this.Tickets = data,
            console.log(data)
        },
        error => {
          if (error.error === "No incidents found matching the search criteria") {
            Swal.fire({
              title: 'No incidents found',
              text: 'There are no incidents matching the search criteria.',
              icon: 'info'
            });
          } else {
            console.log(error)
          }
        }
      );
    }



  }


  search(event: any) {
    this.ticketService.getUsers(event.query).then(data => {
      this.results = data;
    });
  }

  searchAssign(event: any) {
    this.ticketService.getAssigned(event.query).then(data => {
      this.resultsAssign = data;
      console.log(data)
      if (this.declarantInputValue && !this.results.length) {
        Swal.fire({
          icon: 'error',
          title: 'User not found',
          text: 'No users were found with that name. Please try again with a different name.',
        });
        return; // Stop the function from continuing
      }
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
    if (this.userRole == 'Admin') {
      this.ticketService.getTicketsList().subscribe(data => {
        this.Tickets = data;
      });
    }
    else {

      this.ticketService.getTicketByEmail(this.email).subscribe(data => {
        this.Tickets = data;
      });
    }
  }

  getTicketsRefresh(){
    if (this.userRole == 'Admin') {
      this.dateInputValue = '';
      this.declarantInputValue = '';
      this.assignerInputValue = '';
      this.statusSelectValue = '';
      this.ticketService.getTicketsList().subscribe(data => {
        this.Tickets = data;
      });
    }
    else {
      this.dateInputValue = '';
      this.declarantInputValue = '';
      this.assignerInputValue = '';
      this.statusSelectValue = '';
      this.ticketService.getTicketByEmail(this.email).subscribe(data => {
        this.Tickets = data;
      });
    }

  }



  viewTicketDetail(id: number) {
    this.router.navigate(['ticketInfo', id]);
  }

  ajoutTicket() {
    this.router.navigate(['ajoutTicket']);
  }

  updateTicket(id: number) {
    this.router.navigate(['updateTicket', id]);
  }

  resetIncidents() {
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
    return this.Tickets ? this.first === (this.Tickets.length - this.rows) : true;
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

  getStatus() {
    this.authser.getStaus().subscribe(
      data => {
        this.status = data
      }
    )
  }

  getTicketsRoleBased() {
    if (!this.email) {

      console.log("Email not available.");
      return;
    }

    this.ticketService.getTicketByEmail(this.email).subscribe(
      data => {
        this.Tickets = data;
        if (this.Tickets.length === 0) {
          // Display a message to the user
          console.log(this.email);
          console.log("No incidents available for this user.");
        }
      },
      error => {
        console.log("Error in ticket ", error);
      }
    );
  }




}
