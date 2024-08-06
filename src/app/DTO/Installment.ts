export interface Installment{
  _id:string;
  year:number;
  installmentOne:string;
  installmentTwo:string;
  installmentThree:string
}
export interface responseTypeError<T>{
  success:boolean;
  message:T;
}
export class CreativeInstallment{
  year:number;
  installmentOne:string;
  installmentTwo:string;
  installmentThree:string
}

