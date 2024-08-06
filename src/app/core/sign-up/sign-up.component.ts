import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SignUpService} from "./sign-up.service";
import {NbToastrService} from "@nebular/theme";
import {SignUpData} from "../../DTO/signUp";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signinForm: FormGroup;
  submit = false;
   signUpList:SignUpData;
   signUpListData:SignUpData[]
  showPassword: boolean = false;
   fileData:any;
  loadbill=false;
  buttonHide=false;
  userId:string;
  ReadOnly=false;
  beforeSubmit=false;
  afterSubmit=true;
  get sgf(){
    return this.signinForm.controls;
  }

  constructor(private fb:FormBuilder,
              private route:Router,
              private signService:SignUpService,
              private toast:NbToastrService,) {
  }

  ngOnInit(): void {
  this.signUpValidations();
  }
  signUpValidations(){
    this.signinForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      designation:['',[Validators.required]],
      role:['',[Validators.required]],
      profile:['']
    })
  }
  signUp() {
    this.submit = true;
    if (this.signinForm.invalid){
      return;
    }
    else {
      const Data = new SignUpData()
      Data.name= this.signinForm.get('name').value;
      Data.email= this.signinForm.get('email').value;
      Data.password = this.signinForm.get('password').value;
      Data.designation = this.signinForm.get('designation').value;
      Data.userType = this.signinForm.get('role').value;
      this.signService.signup(Data).subscribe(x=>{
        if(x.success){
          this.signinForm.get('profile').setValidators([Validators.required]);
          this.signinForm.get('profile').updateValueAndValidity();
          this.submit = false;
          this.loadbill = true;
          this.ReadOnly = true;
          this.buttonHide =true;
          this.beforeSubmit=true;
          this.afterSubmit=false;
          this.userId = x.message._id;
          console.log(this.userId)
          console.log(x.message)
          this.toast.success('SignUp is Success', 'Success', {duration:1000})
        }else {
          this.toast.danger('Failed to signUp', 'Error', {duration:1000})
        }
      },error => {
        this.toast.danger('error', 'Error', {duration:1000})
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onselectFile(event:any) {
    if(event.target.files.length > 0){
      this.fileData = event.target.files[0];
    }
  }

  save() {
    this.submit = true;
    if(this.signinForm.invalid){
      return;
    }
    else {
      const formData = new FormData();
      formData.append('image', this.fileData);
      console.log(this.fileData);
      console.log(this.userId, formData);
      this.signService.uploadProfile(this.userId, formData).subscribe( response =>{
        if(response.success){
          this.toast.success('Saved to data successfully', 'success', {duration:1500});
          this.submit = false;
          this.route.navigate(['/loginpage'])
        }else {
          this.toast.danger('failed to data', 'Error', {duration:1500})
        }
      },error => {
        this.toast.danger('error', 'Error', {duration:1500})
      });
    }
  }
}
