import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ILogin } from '../../pages/account/models/login.interface'
import { Observable, delay, map } from "rxjs";
import {AppConstants} from'src/app/constants';
import { IUser } from '../models/user.interface';
import { IAPIResponse } from '../models';
import { AppHttpService } from './app-http.service';

@Injectable({providedIn: 'root'})
export class AuthService{
  

    private _user:IUser;
    public get user(){
        return this._user;
    }

    private _token:string;
    public get token(){
        return this._token;
    }

    public set token(value:string){
        this._token=value;
    }



    constructor(private _httpClient: AppHttpService) {
        this._user = { firstName: '',  role: '', userCode: '' };
        this._token = localStorage.getItem(AppConstants.myTokenKey) || '';
      }


    login(input:ILogin):Observable<IAPIResponse>{
       return this._httpClient.post('/api/authenticate',
       input).pipe(map(apiResponse=>{
        const model=apiResponse as IAPIResponse;
        return model;
       }))
       ;
    }

    loadUser() {
 let userName = localStorage.getItem(AppConstants.usernameKey);

        return this._httpClient
        .get(`/api/userlogin?username=${userName}`)
        .pipe(delay(2000))
        .pipe(map((apiResponse: any) => {
            console.log(apiResponse.message);
            this._user={
                ...apiResponse,
                firstName:apiResponse.firstName,
                role:apiResponse.roles
            };
            return this._user;
        }))
    }
    logout(){
        return this._httpClient.get('/api/logout');
    }

}