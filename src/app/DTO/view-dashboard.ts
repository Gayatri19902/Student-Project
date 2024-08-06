
export class viewDashboardDataList{
    activeStudents:number;
    inactiveStudents:number;
    expenditure:number;
    pettyCash:number;
    conservation:number;
    total: number;
    students:viewDashboardList[] = [];
}
export interface viewDashboardList{
  Name:string;
  admissionNumber:number;
  Group:string;
  Medium:string;
  Status:string;
}
export class responseTypeError<T>{
 success:boolean;
 message:T;
}
