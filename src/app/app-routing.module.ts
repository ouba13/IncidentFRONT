import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
const routes: Routes = [
{ path : 'ticketInfo/:id', component : TicketDetailComponent},
{ path : '', component : TicketListComponent},
{ path : 'ajoutTicket', component : AddTicketComponent},
{ path : 'updateTicket/:id', component : UpdateTicketComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
