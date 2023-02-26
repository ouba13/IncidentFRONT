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

  getTicketById(id: number): Observable<Ticket> {
    const url = `${this.baseURL}/${id}`;
    return this.httpClient.get<Ticket>(url);
  }

  getUsers(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/searchByUser?firstName="+user).toPromise() ;
  }

  getAssigned(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/searchByAdmin?firstName="+user).toPromise() ;
  }


  submitForm(form: any) {
    const formData: FormData = new FormData();
    formData.append('dateInput', form.dateInput.value);
    formData.append('declarantInput', form.declarantInput.value);
    formData.append('assignerInput', form.assignerInput.value);
    formData.append('statusSelect', form.statusSelect.value);
    return this.httpClient.post("http://localhost:8080/search", formData);
  }
}
