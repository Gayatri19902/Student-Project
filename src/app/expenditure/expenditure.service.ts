import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Component } from "@angular/core";
import {Observable} from "rxjs";
import {addExpenditureData, ExpeditureList, responseTypeError} from "../DTO/expediture";
@Injectable({
  providedIn: 'root'
})
export class ExpenditureService{
private getJsonValue: any;
private postJsonValue: any;
baseUrl="https://www.bashjump.com/vagdevi-backend/admission/api/"
  constructor(public http:HttpClient) {
  };
  getData():Observable<responseTypeError<ExpeditureList[]>>{
    return this.http.get<responseTypeError<ExpeditureList[]>>(this.baseUrl+"getExpenditure")
  }

  postExpenditureData(data:addExpenditureData):Observable<responseTypeError<addExpenditureData>>{
    return this.http.post<responseTypeError<addExpenditureData>>(this.baseUrl + "addExpenditure", data)
  }
  CreateBill(id: string, payLoad: any):Observable<responseTypeError<any>>{
    return this.http.post<responseTypeError<any>>(this.baseUrl + "addExpenditureBill/" + id , payLoad)
  }
  // ExpenditureExcelFile():Observable<responseTypeError<any>>{
  //   return this.http.get<responseTypeError<any>>(this.baseUrl + "expenditureExeclFile")
  // }
  GetExpenditureBill(id:string):Observable<Blob>{
    return this.http.get(this.baseUrl + "getExpenditureBill/" + id,{responseType:'blob'})
  }
}
