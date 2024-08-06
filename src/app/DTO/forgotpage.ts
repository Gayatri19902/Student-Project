export interface responseTypeData<T>{
  success: boolean;
  message: T;
}
export interface responseTypePasswordData<T>{
  success: boolean;
  message: {
    token:string;
  };
}
export class EmailOtp{
  email: string
}

export class OtpVerify{
  otp: number;
}
export class NewPassword{
  password: string;
}
