import { Injectable } from '@angular/core';
import{ HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import {viewDashboardDataList, viewDashboardList} from "../../DTO/view-dashboard";
import { responseTypeError } from "../../DTO/pettycash";

@Injectable({
  providedIn: 'root'
})
export class ViewDashboardService {
baseurl="https://www.bashjump.com/vagdevi-backend/admission/api/"
  constructor(
    private http:HttpClient,
    ) { }

  getData():Observable<responseTypeError<viewDashboardDataList>>{
     return this.http.get<responseTypeError<viewDashboardDataList>>(this.baseurl+"Home")
  }

}
