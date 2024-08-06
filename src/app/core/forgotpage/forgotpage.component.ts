import {Component, OnInit} from '@angular/core';
import { FormBuilder,Validators, FormControlName, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ForgotService} from "./forgot.service";
import {NewPassword, OtpVerify} from "../../DTO/forgotpage";
import {NbToastrService} from "@nebular/theme";
import {Token} from "@angular/compiler";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forgotpage',
  templateUrl: './forgotpage.component.html',
  styleUrls: ['./forgotpage.component.scss']
})
export class ForgotpageComponent implements OnInit {
  verifyEmailForm!:FormGroup;
  verifyOtpForm!:FormGroup;
  PasswordForm!:FormGroup;
  vEmail = false;
  vOtp = false;
  nPassword = false;
  submitted = false;
  submit = false;
  showPassword = false;
  reEnterPassword = false;
  Token: string;
  get vef(){
    return this.verifyEmailForm.controls;
  }

  get vof(){
    return this.verifyOtpForm.controls;
  }
  get npf(){
    return this.PasswordForm.controls;
  }
  constructor(private fb:FormBuilder,
              private route:Router,
              private forgotService:ForgotService,
              private toastrService: NbToastrService,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.emailForm();
    this.otpForm();
    this.passForm();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleNewPasswordVisibility(){
    this.reEnterPassword = !this.reEnterPassword;
  }
  emailForm(){
    this.verifyEmailForm = this.fb.group({
      emailverify:['',[Validators.required]]
    })
  }
  otpForm(){
    this.verifyOtpForm = this.fb.group({
      otpVerify:['',[Validators.required]]
    })
  }
  passForm(){
    this.PasswordForm = this.fb.group({
      pass:['',[Validators.required]],
      newpass:['',[Validators.required]]
    })
  }
  verifyEmail(){
    this.submitted = true;
    if(this.verifyEmailForm.invalid){
      return;
    }else if(this.vEmail=true){
      console.log("valid");
      const email = this.verifyEmailForm.get('emailverify').value;
      this.forgotService.emailOtpSend(email).subscribe( x => {
        if(x.success){
          this.toastrService.success('Verified Your Email Successfully', 'Verify Email', {duration: 2000});
          this.submitted = false;
          this.vOtp = true;
          this.nPassword = false;
          console.log(x.message);
        }else{
          this.toastrService.danger(' Failed to Verified Your Email', 'Verify Email Fail', {duration: 2000});
        }
      },error => {
        this.toastrService.danger(error, 'Check Your Email', {duration: 2000});
      })
    }
  }

  verifyOtp(){
    this.submit = true;
    if(this.verifyOtpForm.invalid){
      return;
    }else if(this.vOtp == true){
      const data = new OtpVerify();
      data.otp = this.verifyOtpForm.get('otpVerify').value;
      this.forgotService.verifySendOtp(this.verifyEmailForm.get('emailverify').value, data).subscribe(y => {
        if(y.success){
          this.toastrService.success('Verified your Email Otp Successfully', 'Verify Otp', {duration: 2000});
          this.vEmail=true;
          this.nPassword=true;
          this.vOtp=false;
          console.log(y.message);
          this.Token = y.message.token
          console.log(this.Token, 'token')
        }else{
          this.toastrService.danger('Failed your Email Otp', 'Failed Verify Otp', {duration: 2000});
        }
      },error => {
        this.toastrService.danger('error', 'Failed Otp', {duration: 2000})
      })
    }
  }
  newPassword(){
    this.submitted = true;
    if(this.PasswordForm.invalid){
      return;
    }else {
      if (this.PasswordForm.get("pass").value == this.PasswordForm.get("newpass").value) {
        const changePassword = new NewPassword();
        changePassword.password = this.PasswordForm.get("pass").value;
        changePassword.password = this.PasswordForm.get("newpass").value;
        this.forgotService.createNewPassword(this.verifyEmailForm.get('emailverify').value, changePassword, this.Token).subscribe(response => {
          if (response.success) {
            this.submitted = false;
            this.toastrService.success('Created New Password Successfully', 'New Password Creation', {duration: 2000});
            console.log(response.message);
            this.route.navigate(['']);
          } else {
            this.toastrService.danger('Failed to Create New Password Successfully', ' Failed New Password Creation', {duration: 2000});
          }
        }, error => {
          this.toastrService.danger(error, 'Failed Password Creation', {duration: 2000});
        })
      }
    }
  }
}











