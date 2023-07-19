import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
// import { AuthService } from '../../../core/services/auth.service';
import { MaterialModule } from 'src/app/shared';
import { AuthService } from 'src/app/core/services/auth.service';
import{UserregistrationComponent} from './userregistration/userregistration.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserregistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  
    RouterModule.forChild(
      [
        {
          path:'',
          component:LoginComponent
         // title:'Login Page'
        },
        {
          path:'register',
          component:UserregistrationComponent
         // title:'Login Page'
        },
      ]
      ),
  ],
  providers:[AuthService]
})
export class LoginModule { }
