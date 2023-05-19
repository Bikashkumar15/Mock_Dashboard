import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ILogin } from './models/login.interface'

@Injectable()
export class AccountService{
    constructor(private _httpclient:HttpClient){

    }
    login(input:ILogin){
       return this._httpclient.post('http://localhost:8080/api/authenticate',input);
    }

}