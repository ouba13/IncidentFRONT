import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { AuthGuard } from './guard/application-guard.service';
const routes: Routes = [
{ path : 'ticketInfo/:id', component : TicketDetailComponent,canActivate:[AuthGuard]},
{ path : '', component : TicketListComponent,canActivate:[AuthGuard]},
{ path : 'ajoutTicket', component : AddTicketComponent,canActivate:[AuthGuard]},
{ path : 'updateTicket/:id', component : UpdateTicketComponent,canActivate:[AuthGuard]},
{ path : 'login', component : LoginComponent},
{ path : 'sign', component : SignupComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
