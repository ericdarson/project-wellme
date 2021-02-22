import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { GeturlService } from './geturl.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SharedService } from './shared.service';

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

export class ProfileService {
  
 constructor(private http:HttpClient,private sharedService : SharedService, private getUrl : GeturlService,private session : LocalStorageService) {
   
 }
  
  getProfile():Observable<any>{
    const url= this.getUrl.getProfileUrl();
    var bca_id = this.session.retrieve("bca_id")
    var token = this.session.retrieve("token")
    var headers=new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
        'Access-Control-Allow-Origin': '*',
        'Identity':'ERICIMPOSTORNYA',
        'Bca-Id': String(bca_id),
        'Token':String(token),
      })
    

    return this.sharedService.requestConn("get",url,null,headers);
    // return this.http.get(url,httpOptions);
  }
  
}