import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeviceComponent } from './device.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path :'',
        component:DeviceComponent
      }
    ])
  ]
})
export class DeviceModule { }
