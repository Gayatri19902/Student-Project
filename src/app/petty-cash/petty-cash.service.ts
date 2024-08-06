import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable,} from "rxjs";
import {addPettyCashList,PettyCashList, responseTypeError} from "../DTO/pettycash"

@Injectable({
  providedIn: 'root'
})
export class PettyCashService{
private getJsonValue:any;
private postJsonValue:any;
  baseUrl ="https://www.bashjump.com/vagdevi-backend/admission/api/";
  constructor(public http:HttpClient) {
  };

  getData():Observable<responseTypeError<PettyCashList[]>>{
    return this.http.get<responseTypeError<PettyCashList[]>>(this.baseUrl+"pettyCash")
  }
  postData(data:addPettyCashList):Observable<responseTypeError<addPettyCashList>>{
    return this.http.post<responseTypeError<addPettyCashList>>(this.baseUrl + "pettyCash", data)
 }
  CreateBill(id: string, payLoad:any ):Observable<responseTypeError<any>>{
    return this.http.post<responseTypeError<any>>(this.baseUrl + "addPettyCashBill/" + id ,payLoad)
 }
 getPettyCashBill(id:string):Observable<Blob>{
    return this.http.get(this.baseUrl + "getPettyCashBill/" + id,{responseType:'blob'})
 }
}
