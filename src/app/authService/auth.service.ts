import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = "http://localhost:8080/api/v1/auth";
  jwtHelper: any;
  helper = new JwtHelperService();
  decodedtoken : any;

  constructor(private httpClient: HttpClient) { }
  private headers = new HttpHeaders({Authorization: `Bearer `+this.getToken()})


  public addUser(user: any) {
    return this.httpClient.post(`${this.baseURL}/register`, user);
  }


  TokenUser(loginData: any) {
    return this.httpClient.post(`${this.baseURL}/authenticate`, loginData)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            const decodedToken = this.helper.decodeToken(response.token);
            console.log(decodedToken);
            localStorage.setItem('role', decodedToken.role);
            localStorage.setItem('email', decodedToken.sub); // set the role in localStorage
          }
        })
      );
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
    localStorage.removeItem('role')

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
  public getUserRole(){
    return localStorage.getItem('role');
  }
  public getUserEmail(){
    return localStorage.getItem('email');
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
    return this.httpClient.get<any>(`http://localhost:8080/api/v1/auth/allRoles`)
  }

  getStaus():Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/v1/auth/allStatus`)
  }
  public getUserInfo(): any {
    const token = this.getToken();
    return this.jwtHelper.decodeToken(token);
  }

  getUserLoggedIn(email:any){
    return this.httpClient.get(`http://localhost:8080/api/v1/user/getUserByEmail?email=${email}`,{headers:this.headers})
  }


}
