import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {AccessList, AccessListDetails, AccessListId} from "../DTO/access";
import { responseTypeError } from "../DTO/access";

@Injectable({
  providedIn: 'root'
})
export class AccessService {
baseUrl=" https://www.bashjump.com/vagdevi-backend/admission/api/"

  constructor(private http:HttpClient) { }
    getUser(Id:string):Observable<responseTypeError<AccessListId>>{
      return this.http.get<responseTypeError<AccessListId>>(this.baseUrl + "/getUser/" + Id)
  }
  permissionData(id:string, data:AccessListDetails):Observable<responseTypeError<AccessListDetails>>{
    return this.http.post<responseTypeError<AccessListDetails>>(this.baseUrl + "admin-permissions/"+ id, data)
  }


}
