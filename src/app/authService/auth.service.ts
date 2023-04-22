import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = "http://localhost:8080/api/v1/auth";

  constructor(private httpClient: HttpClient) { }
  private headers = new HttpHeaders({Authorization: `Bearer `+this.getToken()})


  public addUser(user: any) {
    console.log(user)
    const token = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.post(`${this.baseURL}/register`, user);
  }


  public TokenUser(loginData: any) {
    return this.httpClient.post(`${this.baseURL}/authenticate`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem("token", token)

  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    return tokenStr;
  }

  public logout() {

    localStorage.removeItem('user');

  }
  //get the token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //getuser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
    }
  }
  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.role;
  }

  checkEmail(email:any):Observable<any>{
    return this.httpClient.post<any>(`${this.baseURL}/checkEmail`,{email}).pipe(
      map(
        response=>{
          return response;
        }
      )
    )
  }

  resetPassword(email:any,token:any,password:any):Observable<any>{
    return this.httpClient.post<any>(`${this.baseURL}/resetPassword`,{email,token,password})
  }

  getRoles():Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/v1/user/allRoles`,{headers:this.headers})
  }



}
