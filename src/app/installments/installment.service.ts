import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Installment, responseTypeError, CreativeInstallment,} from "../DTO/Installment"
@Injectable({
  providedIn: 'root'
})
export class InstallmentService {
  baseurl="https://www.bashjump.com/vagdevi-backend/admission/api/"
  constructor(public http:HttpClient ) { }

  getInstallment(year:number):Observable<responseTypeError<Installment>>{
    return this.http.get<responseTypeError<Installment>>(this.baseurl+ "getInstallment/" + year)
  }
  AllInstallmentsData():Observable<responseTypeError<Installment[]>>{
    return this.http.get<responseTypeError<Installment[]>>(this.baseurl+ "getAllInstallment")
  }
  postInstallment(data: CreativeInstallment):Observable<responseTypeError<CreativeInstallment[]>>{
    return this.http.post<responseTypeError<CreativeInstallment[]>>(this.baseurl + "createInstallment", data)
  }
  // deleteAllData():Observable<responseTypeError<Installment>>{
  //   return this.http.delete<responseTypeError<Installment>>(this.baseurl+"deleteAllInstallments")
  // }
}
