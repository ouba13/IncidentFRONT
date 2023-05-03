import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Ticket } from '../ticket';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  private baseURL="http://localhost:8080/api/v1/incident";
  constructor(private httpClient : HttpClient,private auth: AuthService) {}

  email =this.auth.getUserEmail();
  //private headers = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})
  private headers = new HttpHeaders({Authorization: `Bearer `+this.auth.getToken()})


  getTicketsList(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(`${this.baseURL}/incidents`,{headers:this.headers})
      .pipe(map(tickets => tickets.sort((a, b) => {
        return new Date(b.creationdate).getTime() - new Date(a.creationdate).getTime();
      })));
  }



  createTicket(ticket:any){
    return this.httpClient.post(`${this.baseURL}/addIncident`,ticket,{headers:this.headers}) ;
  }

  updateTicket(id: number, ticket: any){
    return this.httpClient.put(`${this.baseURL}/incidents/${id}`, ticket,{headers:this.headers});
  }


  getTicketById(id: number): Observable<Ticket> {
    const url = `${this.baseURL}/getincident/${id}`;
    return this.httpClient.get<Ticket>(url,{headers:this.headers});
  }

  getTicketByEmail(email: string | null): Observable<Ticket[]> {
    const url = `${this.baseURL}/incidentsByUser?email=${email}&order=creationdate DESC`;
    return this.httpClient.get<Ticket[]>(url, { headers: this.headers });
  }

  getUsers(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/api/v1/user/searchByUser?firstName="+user,{headers:this.headers}).toPromise() ;
  }

  getAssigned(user:any) {
    return this.httpClient.get<any>("http://localhost:8080/api/v1/user/searchByAdmin?firstName="+user,{headers:this.headers}).toPromise() ;
  }

  search(filter: any) {
    return this.httpClient.post('http://localhost:8080/api/v1/incident/search', filter,{headers:this.headers});
  }
}
