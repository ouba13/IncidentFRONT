import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { AuthGuard } from './guard/application-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RestCodeComponent } from './rest-code/rest-code.component';
import { RoleGuard } from './guard/role.guard';

const routes: Routes = [
{ path : 'ticketInfo/:id', component : TicketDetailComponent,canActivate:[AuthGuard]},
{ path : '', component : TicketListComponent,canActivate:[AuthGuard]},
{ path : 'ajoutTicket', component : AddTicketComponent,canActivate:[AuthGuard]},
{ path : 'updateTicket/:id', component : UpdateTicketComponent,canActivate:[AuthGuard]},
{ path : 'login', component : LoginComponent},
{ path : 'sign', component : SignupComponent},
{ path : 'resetPassword', component : ResetPasswordComponent},
{ path : 'resetCode', component : RestCodeComponent},

/*
{ path: 'assignedComp/ticket-list', component: TicketListAssignedComponent},
{ path: 'assignedComp/update-ticket/:id', component: UpdateTicketAssignedComponent,canActivate:[AuthGuard]},
{ path: 'assignedComp/view-ticket/:id', component: ViewTicketAssignedComponent,canActivate:[AuthGuard]},


{ path: 'declarantComp/ticket-list', component: TicketListDeclarantComponent},
{ path: 'declarantComp/update-ticket/:id', component: UpdateTicketlDeclarantComponent,canActivate:[AuthGuard]},
{ path: 'declarantComp/view-ticket/:id', component:TicketdetailDeclarantComponent ,canActivate:[AuthGuard]},
{ path: 'declarantComp/ajoutTicket-dec', component:AddTicketDeclarantComponent ,canActivate:[AuthGuard]},

*/


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
