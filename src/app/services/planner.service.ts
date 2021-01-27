import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  idDetail:number|null=null;
  namaPlannerDetail:string|null=null;
  rekomendasiPembelian:number|null=null;
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
  insertRequest:any={
    nama_plan:"",
    goal_amount:"",
    periodic:"",
    due_date:"",
    kategori:""
  }
  simulasiPlannerRequest:any={};
  kategori:string="";
  idJenisReksadana:number|null=null;

  setIdJenisReksadana(num:number):void{
    this.idJenisReksadana=num;
  }
  getIdJenisReksadana():number|null{
return this.idJenisReksadana;
  }

  constructor(private http:HttpClient) {
  }
  
  setNamaPlannerDetail(nama:string|null):void{
    this.namaPlannerDetail=nama;
  }
  getNamaPlannerDetail():string|null{
    return this.namaPlannerDetail;
  }

  setRekomendasiPembelian(num:number|null):void{
    this.rekomendasiPembelian=num;
  }
  getRekomendasiPembelian():number|null{
    return this.rekomendasiPembelian;
  }
  resetVariable():void{
    this.kategori="";
    this.simulasiPlannerRequest=[];
    this.insertRequest={
      nama_plan:"",
      goal_amount:"",
      periodic:"",
      due_date:"",
      kategori:""
    };
    this.idDetail=null;
  }
  getPlannerList():Observable<any>{
    const url=environment.plannerListUrl;
    
    return this.http.get(url,this.httpOptions);
  }
  
  insertPlanner():Observable<any>{
    const url=environment.insertPlannerUrl;
    
    return this.http.post(url,this.insertRequest,this.httpOptions);
  }
  
  getPlannerDetail():Observable<any>{
    const url=environment.plannerDetailUrl+'/'+this.idDetail;
    
    return this.http.get(url,this.httpOptions);
  }
  
  setIdDetail(idDetail:number):void{
    
    this.idDetail=idDetail;
  }
  getIdDetail():number|null{
    
    return this.idDetail;
  }
  
  getInsertRequest():any{
    return this.insertRequest
  }
  
  isRequestValid():boolean{
    if(this.insertRequest.nama_plan!=""&&this.insertRequest.goal_amount!=""&&this.insertRequest.periodic!=""&&this.insertRequest.kategori!=""&&this.insertRequest.due_date!=""){
      return true;
    }
    else{
      return false;
    }
  }
  setKategori(kategori:string):void{
    this.insertRequest.kategori=String(kategori);
    
  }
  
  setRequest(nama_plan:string,goal_amount:string,periodic:string,dueDate:string){
    this.insertRequest.nama_plan=String(nama_plan);
    this.insertRequest.goal_amount=String(goal_amount);
    this.insertRequest.periodic=String(periodic);
    this.insertRequest.due_date=String(dueDate);
  }
  
  getSimulasiPlanner():Observable<any>{
    const url=environment.simulasiPlannerUrl;
    this.simulasiPlannerRequest={};
    this.simulasiPlannerRequest={
      target:String(this.insertRequest.goal_amount),
      due_date:this.insertRequest.due_date,
      periodic:this.insertRequest.periodic
    };
    console.log(this.simulasiPlannerRequest);
    return this.http.post(url,this.simulasiPlannerRequest,this.httpOptions);
  }
  getPorfileResiko():Observable<any>{
    const url=environment.profileResikoUrl;
    return this.http.get(url,this.httpOptions);
  }

  getListReksadana(idJenis:number):Observable<any>{
    const url=environment.listReksadanaPlannerUrl+'/'+idJenis;
    return this.http.get(url,this.httpOptions);
  }
}