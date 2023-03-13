import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';

 

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {

  id!: number;
  //ticket: Ticket = new Ticket() ;
  statusList!:any;
  xxx="";
  ticket:any;

  constructor(private ticketService: TicketService,private router: Router,private rt: ActivatedRoute ){}

  ngOnInit() : void{
 
    this.ticket={
      id:0,
      libelle : "",
      assigne: {  firstName:"",lastName:"" },
      declarant: "",
      status :"" ,
      creationdate : ""  
    }
    
    this.statusList=[
      {status_id:1,label:'enCour'},
      {status_id:2,label:'terminer'},
      {status_id:3,label:'declancher'}
    ]

    this.id = this.rt.snapshot.params['id'];
    this.ticketService.getTicketById(this.id).subscribe(data => {
      this.ticket =data ;
      //this.ticket.status={status_id:3,label:'declancher'};

      console.log(this.ticket);
      console.log(this.ticket.status);
    },error => console.log(error)) ;
  }
  

  updateTicket(){
    console.log(this.ticket);
 
    this.ticketService.updateTicket(this.id,this.ticket).subscribe(data => {
      console.log(data);
      //this.ticket = new Ticket();
      this.goToTickeList();
    },error => console.log(error)) ;
  }

  goToTickeList(){
    this.router.navigate(['']);
  }
  onSubmit(){
    this.updateTicket() ;
  }

  navigateToTicketList(){
    this.router.navigate(['']);
  }

}
