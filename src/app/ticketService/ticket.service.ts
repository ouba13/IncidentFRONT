import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseURL="http://localhost:8080/api/v1/incident";
  constructor(private httpClient : HttpClient) { }

  private headers = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})

  getTicketsList(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(`${this.baseURL}/incidents`,{headers:this.headers}) ;
  }

  createTicket(ticket:Ticket): Observable<Ticket[]>{
    return this.httpClient.post<Ticket[]>(`${this.baseURL}/addIncident`,ticket) ;
  }

  updateTicket(id: number, ticket: any): Observable<Ticket> {
    return this.httpClient.put<Ticket>(`${this.baseURL}/incidents/${id}`, ticket);
  }


  getTicketById(id: number): Observable<Ticket> {
    const url = `${this.baseURL}/incident/${id}`;
    return this.httpClient.get<Ticket>(url);
  }

  getUsers(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/searchByUser?firstName="+user).toPromise() ;
  }

  getAssigned(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/searchByAdmin?firstName="+user).toPromise() ;
  }


  // submitForm(form: any) {
  //   const formData: FormData = new FormData();
  //   formData.append('dateInput', form.dateInput.value);
  //   formData.append('declarantInput', form.declarantInput.value);
  //   formData.append('assignerInput', form.assignerInput.value);
  //   formData.append('statusSelect', form.statusSelect.value);
  //   return this.httpClient.post("http://localhost:8080/search", formData);
  // }

  search(filter: any) {
    return this.httpClient.post('http://localhost:8080/search', filter);
  }
}
