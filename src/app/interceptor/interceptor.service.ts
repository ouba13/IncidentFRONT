import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {


  constructor(private authService : AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // check if the request URL is the login endpoint
    if (req.url.includes('/api/v1/auth')) {
      // do not add the token to the headers for the login request
      return next.handle(req);
    }
    // add the token to the headers for all other requests
        req=req.clone({
          headers:req.headers.set("Authorization", "Bearer "+this.authService.getToken())
        })
        return next.handle(req);
  }
}
