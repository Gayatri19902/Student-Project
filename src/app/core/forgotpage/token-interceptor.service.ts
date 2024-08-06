import { Injectable, Injector } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpInterceptor} from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import {ForgotService} from "./forgot.service";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private forgotpageservice:ForgotService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const authToken = this.forgotpageservice.getToken();
     if(authToken){
       req = req.clone({
         setHeaders:{
           Authorization: `Bearer ${authToken}`,
         }
       });
     }
    return next.handle(req);
  }


}
