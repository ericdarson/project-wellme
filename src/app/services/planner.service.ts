import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})

export class PlannerService {
  idDetail:number|null=null;
  httpOptions:any={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT,DELETE',
      'Access-Control-Allow-Origin': '*',
      'Identity': 'ERICIMPOSTORNYA',
      'Bca-id':'123',
      'Token':'B905AB43ABF8BB33F532FAB977C1B80A'
    })
  }
 constructor(private http:HttpClient) {
   
 }
  
  getPlannerList():Observable<any>{
    const url=environment.plannerListUrl;

    return this.http.get(url,this.httpOptions);
  }

  insertPlanner(bcaId:string,namaPlan:string,goalAmount:string,
    periodic:string,dueDate:string,kategori:string):Observable<any>{
    const url=environment.insertPlannerUrl;
    const request={
      bcaId:bcaId,
      namaPlan:namaPlan,
      goalAmount:goalAmount,
      periodic:periodic,
      dueDate:dueDate,
      kategori:kategori,
    }
    return this.http.post(url,request,this.httpOptions);
  }

  getPlannerDetail():Observable<any>{
    const url=environment.plannerDetailUrl+'/'+this.idDetail;

    return this.http.get(url,this.httpOptions);
  }

  setIdDetail(idDetail:number):void{
    
    this.idDetail=idDetail;
    console.log('Set Id Detail: ',this.idDetail)
  }
  getIdDetail():number|null{
    console.log('Get Id Detail: ',this.idDetail)
    return this.idDetail;
  }
  
}