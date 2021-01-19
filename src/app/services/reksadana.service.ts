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

export class ReksadanaService {
  
 constructor(private http:HttpClient) {
   
 }

 getReksadana(kategoriId:string):Observable<any>{
    const url=environment.getReksadanaUrl + "/:"+ kategoriId;
    
    return this.http.get(url,httpOptions);
  }
}