import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    DoughnutChartComponent
  ],
  exports: [
    DoughnutChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedChartModule { }
