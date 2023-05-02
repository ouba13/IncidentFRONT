import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/Status';
import { AuthService } from 'src/app/authService/auth.service';
import { TicketService } from 'src/app/ticketService/ticket.service';

@Component({
  selector: 'app-add-ticket-declarant',
  templateUrl: './add-ticket-declarant.component.html',
  styleUrls: ['./add-ticket-declarant.component.css']
})
export class AddTicketDeclarantComponent {
  constructor(private router: Router,private ticketService: TicketService,private authser:AuthService ,private formBuilder: FormBuilder) {}
  ticket:any;
  registerForm!: FormGroup;
  status: Status[] = [];
  text = "";
  results!: any;
  textAssign = "";
  resultsAssign!: any[];

  ngOnInit():void{
    this.registerForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      assigne: ['', Validators.required],
      declarant: ['', Validators.required],
      creationdate:['', Validators.required],
      status: [Status, Validators.required]
    })
    this.getStatus()

  }

  saveTicket(){
    var id
    if (this.registerForm.valid) {
      switch (this.registerForm.value.status) {
        case "EnCour":
          id = 1;
          break;
        case "Terminer":
          id = 2;
          break;
        case "Declancher":
          id = 3;
          break;
      }

      const statusObject = {
        status_id: id,
        label: this.registerForm.value.status
      };
      this.ticket = {
        libelle: this.registerForm.value.libelle,
        assigne: this.registerForm.value.assigne,
        declarant: this.registerForm.value.declarant,
        creationdate: this.registerForm.value.creationdate,
        status:statusObject
    };

    console.log(this.ticket)
    this.ticketService.createTicket(this.ticket).subscribe(data => {
      console.log(data);
      this.goToTickeList();
    },
    error => console.log(error));
  }
}

  goToTickeList(){
    this.router.navigate(['declarantComp/ticket-list']);
  }

  navigateToTicketList(){
    this.router.navigate(['declarantComp/ticket-list']);
  }


  getStatus(){
    this.authser.getStaus().subscribe(
      data =>{
        console.log(data)
        this.status = data
      }

    )
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

  searchAssign(event: any) {
    this.ticketService.getAssigned(event.query).then(data => {
      this.resultsAssign = data;
      console.log(data)
    });
  }

  selectAssign(event: any) {
    console.log(event)
    this.textAssign = event.id;
  }
}
