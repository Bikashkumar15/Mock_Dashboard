
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MultilineChartComponent } from '../multiline-chart/multiline-chart.component';

@NgModule({
  declarations: [
    SummaryComponent,
    MultilineChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SummaryComponent
      }
    ])
  ]
})
export class SummaryModule { }