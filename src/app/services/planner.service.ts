import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
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

export class PlannerService {
  
 constructor(private http:HttpClient) {
   
 }
  
  getPlannerList(bcaId:string):Observable<any>{
    const url=environment.plannerListUrl + "?bcaId="+ bcaId;
    
    return this.http.get(url,httpOptions);
  }
  
}