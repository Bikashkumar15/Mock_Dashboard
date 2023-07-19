import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ILogin } from '../../pages/models/login.interface'
import { Observable, delay, map } from "rxjs";
import { AppConstants } from 'src/app/constants';
import { IUser } from '../models/user.interface';
import { IAPIResponse } from '../models';
import { AppHttpService } from './app-http.service';
import { IRegisterUser } from 'src/app/pages/models/register.interface';
const API_URL = "http://localhost:8080/";

@Injectable()
export class AuthService {


  private _user: IUser;
  public get user() {
    return this._user;
  }

  private _token: string;
  public get token() {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }



  constructor(private _httpClient: AppHttpService, private http: HttpClient) {
    this._user = { firstName: '', role: '', userCode: '' };
    this._token = localStorage.getItem(AppConstants.myTokenKey) || '';
  }


  login(input: ILogin): Observable<IAPIResponse> {
    return this._httpClient.post('/api/authenticate',
      input).pipe(map(apiResponse => {
        const model = apiResponse as IAPIResponse;
        return model;
      }))
      ;
  }
  userRegister(input:IRegisterUser):Observable<IRegisterUser>{
    return this._httpClient.post('/api/adduser',
    input).pipe(map(apiResponse=>{
      const model=apiResponse as IRegisterUser;
    return model;}));
  }

  loadUser() {
    let userName = localStorage.getItem(AppConstants.usernameKey);

    return this._httpClient
      .get(`/api/userlogin?username=${userName}`)
      .pipe(delay(2000))
      .pipe(map((apiResponse: any) => {
       
        this._user = {
          ...apiResponse,
          firstName: apiResponse.firstName,
          role: apiResponse.roles
        };
        return this._user;
      }))
  }
  logout() {
    return this._httpClient.get('/api/logout');
  }
  getDeviceHistory(machineId: any, fromDate: any, toDate: any) {
    return this._httpClient.get(`/api/devicehistory?deviceId=${machineId}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  getSensorList() {
    console.log(" opps i reach here ");
    return this._httpClient.get('/api/sensorlist');
  }
  // getTdsSensorGrphRaw(machineId: any, selecteddate: any) {
  //   return this._httpClient.get(`/api/tdsfeed?machineId=${machineId}&timeStamp=${selecteddate}`);
  // }

  getTempSensorGrphRaw(machineId: any, selecteddate: any) {
    return this._httpClient.get(`/api/tempfeed?machineId=${machineId}&timeStamp=${selecteddate}`);
  }
  getFlowSensorGrphRaw(machineId: any, selecteddate: any) {
    return this._httpClient.get(`/api/flowfeed?machineId=${machineId}&timeStamp=${selecteddate}`);
  }

  getTdsSensorGrphRaw(machineId: any,  noOfDays:any) {
    return this._httpClient.get(`/api/gettds?deviceId=${machineId}&noOfDays=${noOfDays}`);
  }

  getliveSensorInfo() {
    return this._httpClient.get('/api/getliveinfo');
  }
  
}

