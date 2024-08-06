import { Injectable } from '@angular/core';
import {HttpClient,} from "@angular/common/http";
import {Observable} from "rxjs";
import {addConservation, consevationList, Responsetype} from "../DTO/conservation";

@Injectable({
  providedIn: 'root'
})
export class ConservationService {
  baseUrl="https://www.bashjump.com/vagdevi-backend/admission/api/"

  constructor(public http:HttpClient) { }
  getData():Observable<Responsetype<consevationList[]>>{
    return this.http.get<Responsetype<consevationList[]>>(this.baseUrl+"getConservation")
  }
  postData(data:addConservation):Observable<Responsetype<addConservation>>{
    return this.http.post<Responsetype<addConservation>>(this.baseUrl + "addConservation", data)
  }

  CreateBill(id: string, payLoad: any):Observable<Responsetype<any>>{
    return this.http.post<Responsetype<any>>(this.baseUrl + "addConservationBillById/" + id , payLoad)
  }
  // ExpenditureExcelFile():Observable<responseTypeError<any>>{
  //   return this.http.get<responseTypeError<any>>(this.baseUrl + "expenditureExeclFile")
  // }
  GetConservationBill(id:string):Observable<Blob>{
    return this.http.get(this.baseUrl + "getConservationBillById/" + id,{responseType:'blob'})
  }

}
