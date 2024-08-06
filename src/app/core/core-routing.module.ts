import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginpageComponent} from "./loginpage/loginpage.component";
import {ForgotpageComponent} from "./forgotpage/forgotpage.component";


const routes: Routes = [
  { path:'loginpage',component:LoginpageComponent},
  {path:'forgotpage', component:ForgotpageComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
