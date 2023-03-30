import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL="http://localhost:8080";
  constructor(private httpClient : HttpClient) { }
  public addUser(user:any) {
    return this.httpClient.post(`${this.baseURL}/api/v1/auth/register`,user) ;
  }

}
