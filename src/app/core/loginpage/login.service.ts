import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {responseTypeDataError, SignInData} from "../../DTO/signUp";
import { responseTypeError } from "../../DTO/access";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
baseUrl="https://www.bashjump.com/vagdevi-backend/admission/api/"
  constructor(public http:HttpClient) { }

signInData(data:SignInData):Observable<responseTypeDataError<SignInData>>{
    return this.http.post<responseTypeDataError<SignInData>>(this.baseUrl + "signin" , data )
}

}
