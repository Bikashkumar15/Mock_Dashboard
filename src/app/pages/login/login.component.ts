import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../../core/services/auth.service';
import { AppConstants } from 'src/app/constants';
import { ILogin } from '../models/login.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginInput: ILogin = {
    username: localStorage.getItem(AppConstants.usernameKey) || '',
    remeberMe: localStorage.getItem(AppConstants.remeberMeKey) === 'true',
    password: '',
  };
  sending: boolean = false;
  unauthorized:boolean=false;
  apiResponse:any={};

  constructor(
    private _authService: AuthService,
    private _router: Router
    ) {}

  ngOnInit(): void {}

  postLoginForm() {
    this.sending = true;
    this.unauthorized=false;
    this._authService.login(this.loginInput).subscribe(apiResponse => {
      this.sending = false;

      if (this.loginInput.username) {
        // Store username to browser storage
        localStorage.setItem(AppConstants.usernameKey, this.loginInput.username);
      } else {
        localStorage.removeItem(AppConstants.usernameKey);
      }

      if (this.loginInput.remeberMe) {
        localStorage.setItem(AppConstants.remeberMeKey, `${this.loginInput.remeberMe}`);
      } else localStorage.removeItem(AppConstants.remeberMeKey);

      // Redirect user to dashboard
      if(apiResponse && apiResponse.id) {
        this._authService.token=apiResponse.token;
        localStorage.setItem(AppConstants.myTokenKey, apiResponse.token);
        this._router.navigate(['dashboard']);
      }
    },
    err=>{
      this.sending=false;

      console.log(err.status);
      if(err.status===403){
        this.unauthorized=true;
      }
    }
    
    
    );
  }
}