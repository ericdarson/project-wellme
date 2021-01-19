import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import {environment} from 'src/environments/environment'
const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
    'Access-Control-Allow-Origin': '*',
    'Identity': 'ERICIMPOSTORNYA',
  })
}
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
 constructor(private http:HttpClient) {
   
 }
  
  login(username:string,password:string):Observable<any>{
    const url=environment.loginUrl;
    const md5 = new Md5();
    password=md5.appendStr(password).end().toString();
    const request={
      username:username,
      password:password
    }
    return this.http.post(url,request,httpOptions);
  }
  
}