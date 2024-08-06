export class responseTypeError<T>{
  success:boolean;
  message:T;
}
export class AccessList{
  _id:string;
  name:string;
  password:string;
  email:string;
  userType: string;
  permissions:permissionsData[]=[];
}
export class  Picture{
  originalname:string
}
export class AccessListId{
  _id:string;
  name:string;
  password:string;
  email:string;
  userType: string;
  permissions:permissionsData[]=[];
  profilePicture? = new Picture()
}

export class AccessListDetails{
  _id:string;
  name:string;
  password:string;
  email:string;
  userType: string;
  permissions:permissionsData[]=[];
}
export class permissionsData{
}

export  class UpdateUser{
  // _id: string;
  name: string;
  // password: string;
  email: string;
  // designation: string;
  // permissions: string[];
  // userType: string;
  // createdAt: Date;
  // updatedAt: Date;
}
