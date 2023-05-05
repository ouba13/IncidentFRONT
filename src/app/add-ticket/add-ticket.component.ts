import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../ticket';
import { TicketService } from '../ticketService/ticket.service';
import { AuthService } from '../authService/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../Status';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent {
  constructor(private router: Router,private ticketService: TicketService,private authser:AuthService ,private formBuilder: FormBuilder,private httpClient: HttpClient) {}
  ticket:any;
  registerForm!: FormGroup;
  status: Status[] = [];
  text = "";
  results!: any;
  textAssign = "";
  resultsAssign!: any[];
  currentUserRole!:any
  currentUser!:any
  selectedFile !: File

  ngOnInit():void{
    this.currentUserRole = this.authser.getUserRole()
    this.registerForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      assigne: ['', ],
      declarant: ['', ],
      creationdate:['', Validators.required],
      status: [Status, ],
      image:[File,Validators.required]
    })
    this.getStatus()
    this.getUserLoggedIn()
    console.log(this.currentUser)

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
      switch(this.currentUserRole){
        case "Declarant":
          const statusObject = {
            status_id: 3,
            label: "Declancher"
          };

          console.log(this.selectedFile);
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
          this.httpClient.post('http://localhost:8080/api/v1/incident/upload', uploadImageData,{ observe: 'response',headers: new HttpHeaders({Authorization: `Bearer `+this.authser.getToken()})})
          .subscribe((response) => {
          console.log('respone :' , response)
          }
      );
          this.ticket = {
            libelle: this.registerForm.value.libelle,
            assigne: null,
            declarant: this.currentUser,
            creationdate: this.registerForm.value.creationdate,
            status:statusObject,
            image:this.selectedFile
          };

          console.log(this.ticket)
          this.ticketService.createTicket(this.ticket).subscribe(data => {
          console.log(data);
          this.goToTickeList();
        },
        error => console.log(error))
        break;

        case "Assigned":
        console.log();
        break;
      }

  }
}

  goToTickeList(){
    this.router.navigate(['']);
  }

  navigateToTicketList(){
    this.router.navigate(['']);
  }


  getStatus(){
    this.authser.getStaus().subscribe(
      data =>{
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

  getUserLoggedIn(){
    this.authser.getUserLoggedIn(this.authser.getUserEmail()).subscribe(
      data=>{
        this.currentUser = data
      }
    )
  }

  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
}
