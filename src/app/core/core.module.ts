import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './component/layouts/account/account.component';
import { DashboardComponent } from './component/layouts/dashboard/dashboard.component';
import { AuthorizeDirective } from './directives/authorize.directive';
import { AbsFilePathPipe } from './pipes/abs-file-path.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    AbsFilePathPipe,
    AuthorizeDirective
  ],
  exports:[
    AccountComponent,
    DashboardComponent,
    AbsFilePathPipe,
    AuthorizeDirective,
    HttpClientModule,
    RouterModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class CoreModule { }
