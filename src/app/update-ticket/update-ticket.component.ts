import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';
import { AuthService } from '../authService/auth.service';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {

  myForm!: FormGroup;

  id!: number;
  ticket!:Ticket;
  status!: any ;

  results!: any;
  resultsAssign!: any[];
  textAssign = "";
  text = "";

  currentUserRole!:any

  constructor(private ticketService: TicketService,private router: Router,private rt: ActivatedRoute,private authser:AuthService ){}

  ngOnInit() : void{
    this.currentUserRole =this.authser.getUserRole()
    console.log(this.currentUserRole)
    this.getStatus();
    this.id = this.rt.snapshot.params['id'];
    this.ticketService.getTicketById(this.id).subscribe(data => {
      this.ticket =data
    },error => console.log(error))


  }


  updateTicket(){
    this.ticket.status = { status_id: this.ticket.status.status_id, label: this.ticket.status.label };
    this.ticketService.updateTicket(this.id,this.ticket).subscribe(data => {
      this.navigateToTicketList();
      console.log(data)
    },error => console.log(error)) ;
  }



  navigateToTicketList(){
    this.router.navigate(['']);
  }

  getStatus(){
    this.authser.getStaus().subscribe(
      data =>{
        this.status = data;

      }
    )
  }

  searchAssign(event: any) {
    this.ticketService.getAssigned(event.query).then(data => {
      this.resultsAssign = data;

    });
  }

  selectAssign(event: any) {
    console.log(event)
    this.textAssign = event.id;
  }


select(event: any) {
    console.log(event)
    this.text = event.id;
  }

  search(event: any) {
    this.ticketService.getUsers(event.query).then(data => {
      this.results = data;
    });
  }

  


}
