import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewDashboardComponent} from "./view-dashboard/view-dashboard.component";
import {StudentComponent} from "../student/student.component";
import {ExpenditureComponent} from "../expenditure/expenditure.component";
import {InstallmentsComponent} from "../installments/installments.component";
import {StudentFormComponent} from "../student-form/student-form.component";
import {AccessComponent} from "../access/access.component";
import {ShowAccessComponent} from "../show-access/show-access.component";
import {SettingsComponent} from "../settings/settings.component";
import {ConservationComponent} from "../conservation/conservation.component";
import {PettyCashComponent} from "../petty-cash/petty-cash.component";

const routes: Routes = [
  {path:'dash',component:ViewDashboardComponent},
  {path:'student', component:StudentComponent},
  {path:'expenditure',component:ExpenditureComponent},
  {path: 'pettyCash', component:PettyCashComponent},
  {path:'installments',component:InstallmentsComponent},
  {path:'access',component:AccessComponent},
  {path:'studentform',component:StudentFormComponent},
  {path:'ShowAccess',component:ShowAccessComponent},
  {path:'settings',component:SettingsComponent},
  {path:'conservation',component:ConservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
