import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';
import { AuthService } from '../authService/auth.service';

 

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {

  id!: number;
  statusList!:any;
  ticket:any;
  status!: any[] ;
  selectedStatusId!: number;

  constructor(private ticketService: TicketService,private router: Router,private rt: ActivatedRoute,private authser:AuthService ){}

  ngOnInit() : void{
 
    // this.ticket={
    //   id:0,
    //   libelle : "",
    //   assigne: {  firstName:"",lastName:"" },
    //   declarant: "",
    //   status :"" ,
    //   creationdate : ""  
    // }
    this.getStatus();
    this.id = this.rt.snapshot.params['id'];
    this.ticketService.getTicketById(this.id).subscribe(data => {
      this.ticket =data ;
    },error => console.log(error)) ;

    
  }
  

  updateTicket(){
    this.ticketService.updateTicket(this.id,this.ticket).subscribe(data => {
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
  
  getStatus(){
    this.authser.getStaus().subscribe(
      data =>{
        this.status = data;
        
      }
    )
  }

}
