import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {responseTypeError, UpdateUser} from "../DTO/access";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl="https://www.bashjump.com/vagdevi-backend/admission/api/"
  constructor(private http:HttpClient) { }


  updateUser(id: string, UserData: UpdateUser): Observable<responseTypeError<UpdateUser>> {
    return this.http.put<responseTypeError<UpdateUser>>(this.baseUrl + "updateUser/" + id, UserData);
  }
  updateProfile(id:string, payLoad:any):Observable<responseTypeError<any>>{
    return this.http.post<responseTypeError<any>>(this.baseUrl + "upload-profilePicture/" + id , payLoad)
  }

}
