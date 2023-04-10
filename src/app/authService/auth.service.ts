import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  public addUser(user: any) {
    return this.httpClient.post(`${this.baseURL}/api/v1/auth/register`, user);
  }


  public TokenUser(loginData: any) {
    return this.httpClient.post(`${this.baseURL}/api/v1/auth/authenticate`, loginData);
  }
  public loginUser(token: any) {
    localStorage.setItem("token", token)

  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    return tokenStr;
  }

  public logout() {
    localStorage.removeItem('token');
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




}
