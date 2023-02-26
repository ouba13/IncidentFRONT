import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { TicketListComponent } from './ticket-list/ticket-list.component';
const routes: Routes = [
{ path : 'ticketInfo/:id', component : TicketDetailComponent},
{ path : '', component : TicketListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
