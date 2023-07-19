import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PwsTableComponent } from './pws-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// @NgModule({
//   declarations: [
//     SummaryComponent,
//     MultilineChartComponent
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,ReactiveFormsModule,
//     RouterModule.forChild([
//       {
//         path: '',
//         component: SummaryComponent
//       }
//     ])
//   ]
// })



@NgModule({
  declarations: [
   

  ],
  imports: [
      
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   
    NgxPaginationModule,
    PwsTableComponent,
    RouterModule.forChild([{
      path :'',
      component:PwsTableComponent
    }])
    // RouterModule.forChild([
    //   {
    //     path :'',
    //     component:PwsTableComponent
    //   }
    // ])
  ]
})
export class PswTableModule { }


