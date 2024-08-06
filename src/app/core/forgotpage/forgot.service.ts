import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {
  NewPassword, OtpVerify,
  responseTypeData, responseTypePasswordData,
} from "../../DTO/forgotpage";

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  baseUrl = " https://www.bashjump.com/vagdevi-backend/admission/api/"
  passwordToken: string;

  constructor(private http: HttpClient,) {}
  getToken(){
    return this.passwordToken
  }

  emailOtpSend(email:string):Observable<responseTypeData<any>>{
    return this.http.post<responseTypeData<any>>(this.baseUrl + "send-otp/" + email, {})
  }

  verifySendOtp(email: string, data: OtpVerify):Observable<responseTypePasswordData<any>>{
    return this.http.post<responseTypePasswordData<any>>(this.baseUrl + "verify-otp/" + email, data);
  }

  createNewPassword(email: string, dataPassword: NewPassword, token:string): Observable<any> {
    this.passwordToken = token
    return this.http.post<any>(this.baseUrl + "password-reset/" + email , dataPassword)
  }

}
