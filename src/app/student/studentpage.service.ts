import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import {
  studentList,
  responseTypeError,
  addStudentList,
  StudentById,
  AdmissionFeeData,
  InstallmentData,
  InstallmentsDTO, InstallmentPaidData, forNotInstallments
} from "../DTO/studentpage";

@Injectable({
  providedIn: 'root'
})
export class StudentpageService{
  baseurl="https://www.bashjump.com/vagdevi-backend/admission/api/"
  constructor(public http:HttpClient) {
  }
  getData():Observable<responseTypeError<studentList[]>>{
    return this.http.get<responseTypeError<studentList[]>>(this.baseurl+"getStudent")
  }
  getStudentListById(id: string):Observable<responseTypeError<StudentById[]>>{
    return this.http.get<responseTypeError<StudentById[]>>(this.baseurl + "getStudent/" + id)
  }
  createStudentDetails(data: addStudentList): Observable<responseTypeError<StudentById>>{
    return this.http.post<responseTypeError<StudentById>>(this.baseurl + "addStudent", data)
  }

  CreateInstallmentPaid(installPaidData: InstallmentsDTO, id: string):Observable<responseTypeError<any>>{
    return this.http.post<responseTypeError<any>>(this.baseurl + "installmentPaid/" + id , installPaidData)
  }

  AdmissinFeeData(Data:AdmissionFeeData, id: string):Observable<responseTypeError<AdmissionFeeData>>{
    return this.http.post<responseTypeError<AdmissionFeeData>>(this.baseurl+"admissionFeePaid/" + id, Data)
 }
  UpdateStudentData(updateData: addStudentList, id: string):Observable<responseTypeError<addStudentList>>{
    return this.http.put<responseTypeError<addStudentList>>(this.baseurl + "updateStudent/" + id , updateData )
  }

  CommitmentFeeData(installData:forNotInstallments, id: string):Observable<responseTypeError<any>>{
     return this.http.post<responseTypeError<any>>(this.baseurl+"installment/"+ id, installData)
  }
}
