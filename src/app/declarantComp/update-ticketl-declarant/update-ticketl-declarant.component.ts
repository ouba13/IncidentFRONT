import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authService/auth.service';
import { Ticket } from 'src/app/ticket';
import { TicketService } from 'src/app/ticketService/ticket.service';

@Component({
  selector: 'app-update-ticketl-declarant',
  templateUrl: './update-ticketl-declarant.component.html',
  styleUrls: ['./update-ticketl-declarant.component.css']
})
export class UpdateTicketlDeclarantComponent {

  myForm!: FormGroup;

  id!: number;
  ticket!:Ticket;
  status!: any ;

  results!: any;
  resultsAssign!: any[];
  textAssign = "";
  text = "";

  constructor(private ticketService: TicketService,private router: Router,private rt: ActivatedRoute,private authser:AuthService ){}

  ngOnInit() : void{

    this.getStatus();
    this.id = this.rt.snapshot.params['id'];
    this.ticketService.getTicketById(this.id).subscribe(data => {
      this.ticket =data ;
    },error => console.log(error)) ;


  }


  updateTicket(){
    this.ticket.status = { status_id: this.ticket.status.status_id, label: this.ticket.status.label };
    this.ticketService.updateTicket(this.id,this.ticket).subscribe(data => {
      this.navigateToTicketList();
    },error => console.log(error)) ;
  }
  


  navigateToTicketList(){
    this.router.navigate(['declarantComp/ticket-list']);
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
