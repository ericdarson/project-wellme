import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { InsertPlannerRequest } from '../models/insert-planner-request';
import { PlannerKonfirmasi } from '../models/planner-konfirmasi';
import { PlannerReksadana } from '../models/planner-reksadana';
import { PlannerBeliState } from '../models/planner-beli-state';


@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  idDetail:number|null=null;
  namaPlannerDetail:string|null=null;
  rekomendasiPembelian:number|null=null;
  jenisReksadanaPembelian:string;
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
  plannerKonfirmasi:PlannerKonfirmasi[]=[];
  
  insertRequest:InsertPlannerRequest={
    nama_plan:"",
    goal_amount:"",
    periodic:"",
    due_date:"",
    kategori:""
  }
  simulasiPlannerRequest:any={};
  kategori:string="";
  idJenisReksadana:number|null=null;
  
  plannerBeliState:PlannerBeliState;
  setPlannerBeliState(p:PlannerBeliState):void{
    this.plannerBeliState=p;
  }
  getPlannerBeliState():PlannerBeliState|null{
    if(this.plannerBeliState==null||this.plannerBeliState==undefined){
      return null;
    }else{
      return this.plannerBeliState;
    }
  }
  setJenisReksadanaPembelian(jenis:string):void{
    this.jenisReksadanaPembelian=jenis;
  }
  getJenisReksadanaPembelian():string{
    return this.jenisReksadanaPembelian;
  }
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
  
  addKonfirmasiPembelian(reksadana:PlannerReksadana)
  {
    var konfirmasi:PlannerKonfirmasi;
    konfirmasi={
      id_jenis_reksadana:this.idJenisReksadana==null?0:this.idJenisReksadana,
      biaya_pembelian:reksadana.biaya_pembelian,
      id_produk:reksadana.id_jenis_reksadana,
      jenis_reksadana:this.jenisReksadanaPembelian,
      minimum_amount:reksadana.minimum_amount,
      nama_produk:reksadana.nama_jenis_reksadana,
      nominal:0
    };
    this.searchKonfirmasi();
    
    this.plannerKonfirmasi.push(konfirmasi);
  }
  
  searchKonfirmasi():void{
    var index:number;
    var exist:boolean=false;
    var keepgoing:boolean=true;
    this.plannerKonfirmasi.forEach((element,key) => {
      
      if(keepgoing){
        if(element.id_jenis_reksadana==this.idJenisReksadana)
        {
          exist=true;
          index=key;
          keepgoing=false;
          exist==true?this.plannerKonfirmasi.splice(index,1):null;
        }
      }
      
    });
    
    
    
  }
  getKonfirmasiByIdJenis(idJenis:number):PlannerKonfirmasi|null{
    
    for (let i = 0; i < this.plannerKonfirmasi.length; i++) {
      if(idJenis==this.plannerKonfirmasi[i].id_jenis_reksadana)
      {
        return this.plannerKonfirmasi[i];
      }
      
    }
    
    return null;
  }
}