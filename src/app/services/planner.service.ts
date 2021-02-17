import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { InsertPlannerRequest } from '../models/insert-planner-request';
import { PlannerKonfirmasi } from '../models/planner-konfirmasi';
import { PlannerReksadana } from '../models/planner-reksadana';
import { PlannerBeliState } from '../models/planner-beli-state';
import { ResponseApi } from '../models/ResponseApi';
import { LocalStorageService } from 'ngx-webstorage';
import { PlannerUpdateRequest } from '../models/planner-update-request';
var CryptoJS = require("crypto-js");

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  idDetail:number|null=null;
  namaPlannerDetail:string|null=null;
  rekomendasiPembelian:number|null=null;
  jenisReksadanaPembelian:string;
  httpOptions:any;
  plannerKonfirmasi:PlannerKonfirmasi[]=[];
  
  insertRequest:InsertPlannerRequest={
    nama_plan:"",
    goal_amount:0,
    periodic:"",
    due_date:"",
    kategori:""
  }
  encryptedObject:String;
  simulasiPlannerRequest:any={};
  kategori:string="";
  idJenisReksadana:number|null=null;
  secretKey:string="aoiw3jtq3p4t8jawefimeifpq32jcf";
  plannerBeliState:PlannerBeliState;
  constructor(private http:HttpClient,private localStorage:LocalStorageService) {
    var bca_id = this.localStorage.retrieve("bca_id")
    var token = this.localStorage.retrieve("token")
    this.httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT,DELETE',
        'Access-Control-Allow-Origin': '*',
        'Identity': 'ERICIMPOSTORNYA',
        'Bca-id':String(bca_id),
        'Token':String(token)
      })
    }
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
      goal_amount:0,
      periodic:"",
      due_date:"",
      kategori:""
    };
    this.idDetail=null;
  }
  getPlannerList():Observable<any>{
    this.updateHeader();
    const url=environment.plannerListUrl;
    
    return this.http.get(url,this.httpOptions);
  }
  
  insertPlanner():Observable<any>{
    this.updateHeader();
    const url=environment.insertPlannerUrl;
    
    return this.http.post(url,this.insertRequest,this.httpOptions);
  }
  
  getPlannerDetail(id : string):Observable<any>{
    this.updateHeader();
    const url=environment.plannerDetailUrl+'/'+id;
    
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
    if(this.insertRequest.nama_plan!=""&&this.insertRequest.goal_amount!=0&&this.insertRequest.periodic!=""&&this.insertRequest.kategori!=""&&this.insertRequest.due_date!=""){
      return true;
    }
    else{
      return false;
    }
  }
  setKategori(kategori:string):void{
    this.insertRequest.kategori=String(kategori);
    
  }
  
  
  setRequest(nama_plan:string,goal_amount:number,periodic:string,dueDate:string){
    this.insertRequest.nama_plan=String(nama_plan);
    this.insertRequest.goal_amount=Number(goal_amount);
    this.insertRequest.periodic=String(periodic);
    this.insertRequest.due_date=String(dueDate);
    //console.log(this.insertRequest);
  }
  
  getSimulasiPlanner():Observable<any>{
    this.updateHeader();
    const url=environment.simulasiPlannerUrl;
    this.simulasiPlannerRequest={};
    this.simulasiPlannerRequest={
      target:String(this.insertRequest.goal_amount),
      due_date:this.insertRequest.due_date,
      periodic:this.insertRequest.periodic
    };

    return this.http.post(url,this.simulasiPlannerRequest,this.httpOptions);
  }
  getPorfileResiko():Observable<any>{
    this.updateHeader();
    const url=environment.profileResikoUrl;
    return this.http.get(url,this.httpOptions);
  }
  
  getListReksadana(idJenis:number):Observable<any>{
    this.updateHeader();
    const url=environment.listReksadanaPlannerUrl+'/'+idJenis;
    return this.http.get(url,this.httpOptions);
  }
  
  
  setLocalStorage(key:string,object:any):boolean{
    this.encryptedObject = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(object), this.secretKey).toString());
    try {
      this.localStorage.store(key,this.encryptedObject);
      return true;  
    } catch (error) {
      return false;
    }
    
    
    
  }
  
  
  getLocalStorage(key:string):any{
    var retrievedObject
    var deData= CryptoJS.AES.decrypt(decodeURIComponent(this.localStorage.retrieve(key)), this.secretKey); 
    try {
      retrievedObject = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
      return retrievedObject;
    } catch (e) {
      //console.log(e)
      return null;
    }
    
  }
  clearLocalStorage(key:string)
  {
    this.localStorage.clear(key)
  }
  
  
  updatePlanner(editRequest:PlannerUpdateRequest,idPlan:number):Observable<any>{
    this.updateHeader();
    const url=environment.updatePlannerUrl+'/'+idPlan;
    return this.http.put(url,editRequest,this.httpOptions);
  }
  deletePlanner(idPlan:number):Observable<any>{
    this.updateHeader();
    const url=environment.updatePlannerUrl+'/'+idPlan;
    return this.http.delete(url,this.httpOptions);
  }
  

  updateHeader():void
  {
    var bca_id = this.localStorage.retrieve("bca_id")
    var token = this.localStorage.retrieve("token")
    this.httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT,DELETE',
        'Access-Control-Allow-Origin': '*',
        'Identity': 'ERICIMPOSTORNYA',
        'Bca-id':String(bca_id),
        'Token':String(token)
      })
    }
  }
  
}