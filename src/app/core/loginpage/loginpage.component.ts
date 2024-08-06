import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {NbMenuService, NbToastrService} from "@nebular/theme";
import {SignInData, SignUpData} from "../../DTO/signUp";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit{
  mylogin! :FormGroup;
  submitted = false;
  signInList:SignUpData[] = [];
  signIndata:SignInData;
  // loading=true;
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  get lgf(){
    return this.mylogin.controls;
  }

  constructor(
    private fb:FormBuilder,
    private route:Router,
    private signInService:LoginService,
    private toast:NbToastrService,
    private nbmenuService: NbMenuService) {
  }
  ngOnInit(): void {
    this.loginValidations();
    this.logOut();
  }

  loginValidations(){
    this.mylogin= this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login(){
    // this.loading=false;
      this.submitted=true;
    if(this.mylogin.invalid){
      return;
    }else {
      const data = new SignInData();
      data.email = this.mylogin.get("email").value;
      data.password = this.mylogin.get("password").value;
      this.signInService.signInData(data).subscribe( x => {
        if(x.success){
          console.log(x.user);
          this.signIndata = x.user;
          this.toast.success('logged successfully', 'user', {duration: 2000});
          this.route.navigate(['/dashboard/dash'])
          localStorage.setItem('user', JSON.stringify(x.user));
        }else{
          this.toast.danger('failed to logged', 'user', {duration: 2000});
        }
      },error => {
        this.toast.danger('error','Error', {duration:1000});
      })
    }
  }
 logOut(){
    this.nbmenuService.onItemClick().subscribe(x => {
      if(x.item.title === 'Logout'){
        localStorage.clear();
      }
    });
 }

}

