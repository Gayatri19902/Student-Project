import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {LoginpageComponent} from "./core/loginpage/loginpage.component";
import {ForgotpageComponent} from "./core/forgotpage/forgotpage.component";
import {SignUpComponent} from "./core/sign-up/sign-up.component";
const routes: Routes = [
  {
    path:'loginpage',
    component:LoginpageComponent
  },
  {
    path:'', component:LoginpageComponent, pathMatch:"full"
  },
  {
    path:'forgotpage',component:ForgotpageComponent,
  },
  {
    path:'signUp',component:SignUpComponent,
  },
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path:'dashboard',loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
