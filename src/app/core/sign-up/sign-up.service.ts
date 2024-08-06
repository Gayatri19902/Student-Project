import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {responseTypeError, SignUpData} from "../../DTO/signUp";
import {AccessList} from "../../DTO/access";


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
baseUrl="https://www.bashjump.com/vagdevi-backend/admission/api/"

  constructor( private http:HttpClient, ) { }
    getAllData():Observable<responseTypeError<AccessList[]>>{
       return this.http.get<responseTypeError<AccessList[]>>(this.baseUrl+"getAllUsers")
    }
  signup(user: SignUpData): Observable<responseTypeError<SignUpData>> {
    return this.http.post<responseTypeError<SignUpData>>(this.baseUrl + "signup", user);
  }
  uploadProfile(id:string, payLoad:any):Observable<responseTypeError<any>>{
  return this.http.post<responseTypeError<any>>(this.baseUrl + "upload-profilePicture/" + id , payLoad)
  }

  getProfile(id:string):Observable<Blob>{
    return this.http.get(this.baseUrl + "get-profilePicture/" + id , {responseType:'blob'})
  }


}
