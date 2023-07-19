import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConstants } from "src/app/constants";
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class AppHttpService{

    constructor(private _httpClient:HttpClient) {}
    private _headers={
        headers:{
            Authorization:'Bearer'+ localStorage.getItem(AppConstants.myTokenKey),

        },

    };
        public get(relativeUrl:string){
            console.log("i m appservice");
            const url:string=environment.baseApi+relativeUrl;
            console.log(url);
            this._headers.headers.Authorization='Bearer '+localStorage.getItem(AppConstants.myTokenKey);
            return this._httpClient.get(url,this._headers);
        }

        public post(relativeUrl:string,body:any){
            const url:string=environment.baseApi+relativeUrl;
            this._headers.headers.Authorization='Bearer'+localStorage.getItem(AppConstants.myTokenKey);
            return this._httpClient.post(url,body,this._headers);
        }
        
    
}