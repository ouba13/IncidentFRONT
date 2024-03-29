import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import {ButtonModule} from 'primeng/button';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SidebarModule} from 'primeng/sidebar';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogModule } from 'primeng/dialog';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RestCodeComponent } from './rest-code/rest-code.component';
import { AuthService } from './authService/auth.service';
import { AuthGuard } from './guard/application-guard.service';
import { InterceptorService } from './interceptor/interceptor.service';
import { SidebarAComponent } from './sidebar-a/sidebar-a.component';
import { RoleGuard } from './guard/role.guard';









@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    SidebarComponent,
    SignupComponent,
    LoginComponent,
    ResetPasswordComponent,
    RestCodeComponent,
    SidebarAComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule ,
    CalendarModule ,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastrModule,
    DropdownModule,
    SidebarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    DialogModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard
    //{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
