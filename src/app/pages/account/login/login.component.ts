import { Component,OnInit } from '@angular/core';
import { ILogin } from '../models/login.interface';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _accountService:AccountService){ }
 apiAuthResp:any={};
 sending:boolean=false;
  
  loginInput:ILogin={ 
    username:localStorage.getItem('username')||'',
    password:'',
    rememberme: localStorage.getItem('rememberme')==='true',
  };

  ngOnInit(): void {}

  postLoginForm(){
    this.sending=true;
    this._accountService.login(this.loginInput)
     .subscribe(apiResp=>{
      this.apiAuthResp=apiResp;
      if(this.loginInput.username){
        localStorage.setItem('username',this.loginInput.username);
      }else{
        localStorage.removeItem('username');
      }
      if(this.loginInput.rememberme){
        localStorage.setItem('rememberme','${this.loginInput.rememberme}');
      }
      else localStorage.removeItem('rememberme');
    });
  }

}
