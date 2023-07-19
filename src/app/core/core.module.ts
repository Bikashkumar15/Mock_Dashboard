import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './component/account/account.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthorizeDirective } from './directives/authorize.directive';
import { AbsFilePathPipe } from './pipes/abs-file-path.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';


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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[AuthService]
})
export class CoreModule { }
