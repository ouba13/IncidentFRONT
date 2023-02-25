import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseURL="http://localhost:8080/incidents";
  constructor(private httpClient : HttpClient) { }

  getTicketsList(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(`${this.baseURL}`) ;
  }

  getUsers(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/searchByUser?firstName="+user).toPromise() ;
  }

  getAssigned(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/searchByAdmin?firstName="+user).toPromise() ;
  }

  // searchTicket(ticket:Ticket){
  //   return this.httpClient.post<Ticket>("http://localhost:8080/search",ticket);
  // }
}