export interface Responsetype<T> {
  success: boolean;
  message:T;
}
export interface consevationList{
  id: string;
  Name: string;
  Subject: string;
  Date: string;
  description: string;
  Amount: number;
}
export class addConservation{
  _id:string;
  name: string;
  subject: string;
  description: string;
  date: string;
  amount: number;
  bill: string;
}
export class ConservationBill{
  bill:File
}
