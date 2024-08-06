export interface PettyCashList{
  id:string
  Name:string,
  Subject:string,
  description: string,
  Date:string,
  Amount:number,
}
export interface responseTypeError<T>{
success:boolean;
message:T;
}
export class addPettyCashList{
  _id:string;
  name: string;
  subject: string;
  description: string;
  date: string;
  amount: number;
  bill: string;
}
export class PettycashBill{
  bill:File
}

