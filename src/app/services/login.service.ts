import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import {environment} from 'src/environments/environment'
import { GeturlService } from './geturl.service';
import { SharedService } from './shared.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
 constructor(private http:HttpClient, private getUrlService : GeturlService,private sharedService: SharedService,private session:LocalStorageService) {
   
 }
  
  login(bca_id:string,password:string):Observable<any>{

    var headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
      'Access-Control-Allow-Origin': '*',
      'Identity': 'ERICIMPOSTORNYA',
    })
    const url= this.getUrlService.getLoginUrl();
    const md5 = new Md5();
    password=md5.appendStr(password).end().toString();
    const request={
      bca_id:bca_id,
      password:password
    }

    return this.sharedService.requestConn("post",url,request,headers)
    // return this.http.post(url,request,httpOptions);
  }

  logout():Observable<any>{
    var headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
      'Access-Control-Allow-Origin': '*',
      'Identity': 'ERICIMPOSTORNYA',
      'token' : this.session.retrieve("token")
    })
    const url= this.getUrlService.getLogoutUrl();
    

    return this.sharedService.requestConn("post",url,{},headers)
    // return this.http.post(url,request,httpOptions);
  }
  
}