export interface responseTypeError<T>{
  success:boolean;
  message:T
}
export class studentList{
  id : string;
  Name : string;
  admissionNumber : number;
  Group : string;
  Medium : string;
  Status : string;
}
export class StudentById{
  installmentOne = new InstallmentClass();
  installmentTwo = new InstallmentClass();
  installmentThree = new  InstallmentClass();
  _id: string;
  admissionNumber: number;
  name: string;
  surName: string;
  fathersName: string;
  mobileNumber: number;
  group: string;
  medium: string;
  address: string;
  installment?:boolean;
}
export class InstallmentClass{
  paid:boolean;
}
export class forNotInstallments{
  commitmentFee:number;
  installment:number;
}
export class addStudentList{
  admissionNumber: number;
  name: string;
  surName: string;
  fathersName: string;
  mobileNumber: number;
  group: string;
  medium: string;
  address: string;
}
export class InstallmentData{
  commitmentFee: number;
  installment = new SelectInstallments();
}
export class InstallmentsDTO{
  installmentOne = new InstallmentPaidData();
  installmentTwo = new InstallmentPaidData();
  installmentThree = new  InstallmentPaidData();
}
export class AdmissionFeeData{
  admissionFee : number;
  admissionFeePaid : boolean;
}

export class InstallmentPaidData{
  due?: number;
  paid?: boolean;
}
export class SelectInstallments{
  none: null;
  twoMonths: boolean;
  threeMonths: boolean;
}


