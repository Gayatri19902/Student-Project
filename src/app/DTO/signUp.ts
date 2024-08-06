export class responseTypeDataError<T>{
  success:boolean;
  user:T
}
export class SignInData{
  name:string;
  email:string;
  password:string;
  permission?:viewpermission[]=[];
}
export class viewpermission{
}
export class responseTypeError<T>{
  success:boolean;
  message:T
}
export class SignUpData{
  _id:string;
  name:string;
  email:string;
  password:string;
  designation: string;
  permission?: viewSignUpPermission[]=[];
  userType: string;
}
export class viewSignUpPermission{

}

