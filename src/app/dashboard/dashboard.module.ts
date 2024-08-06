import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import {NbCardModule, NbLayoutModule, NbSpinnerModule} from "@nebular/theme";
import {DataTablesModule} from "angular-datatables";
import { SharedChartModule } from "../shared-chart/shared-chart.module"

@NgModule({
  declarations: [
    ViewDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbLayoutModule,
    DataTablesModule,
    NbCardModule,
    SharedChartModule,
    NbSpinnerModule,
  ]
})
export class DashboardModule { }
