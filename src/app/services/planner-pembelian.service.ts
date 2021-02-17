import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { InsertPlannerRequest } from '../models/insert-planner-request';
import { PlannerKonfirmasi } from '../models/planner-konfirmasi';
import { PlannerReksadana } from '../models/planner-reksadana';
import { PlannerBeliState } from '../models/planner-beli-state';
import { ResponseApi } from '../models/ResponseApi';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { PlannerPromo } from '../models/planner-promo';
import { PlannerBeliReskadana } from '../models/planner-beli-reskadana';
import {PlannerProduct} from '../models/planner-product';
import { PercentPipe } from '@angular/common';
import { request } from 'http';
import { LocalStorageService } from 'ngx-webstorage';
var CryptoJS = require("crypto-js");
@Injectable({
  providedIn: 'root'
})
export class PlannerPembelianService {
  idDetail:number|null=null;
  namaPlannerDetail:string|null=null;
  rekomendasiPembelian:number|null=null;
  jenisReksadanaPembelian:string;
  requestPembelian:PlannerBeliReskadana;
  httpOptions:any={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT,DELETE',
      'Access-Control-Allow-Origin': '*',
      'Identity': 'ERICIMPOSTORNYA',
      'Bca-id':'jeje',
      'Token':'A905AB43ABF8BB33F532FAB977C1B80A'
    })
  }
  plannerKonfirmasi:PlannerKonfirmasi[]=[];
  
  insertRequest:InsertPlannerRequest={
    nama_plan:"",
    goal_amount:0,
    periodic:"",
    due_date:"",
    kategori:""
  }
  simulasiPlannerRequest:any={};
  kategori:string="";
  idJenisReksadana:number|null=null;
  encryptedObject:String;
  plannerBeliState:PlannerBeliState;
  secretKey:string="aoiw3jtq3p4t8jawefimeifpq32jcf";
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
    this.setLocalStorage("namaPlannerDetail",nama);
    this.namaPlannerDetail=nama;
   
  }
  getNamaPlannerDetail():string|null{
    return this.getLocalStorage("namaPlannerDetail");
  }
  getPorfileResiko():Observable<any>{
    this.updateHeader();
    const url=environment.profileResikoUrl;
    return this.http.get(url,this.httpOptions);
  }
  
  setRekomendasiPembelian(num:number|null):void{
    this.setLocalStorage("rekomendasiPembelian",num);
    this.rekomendasiPembelian=num;
  }
  getRekomendasiPembelian():number|null{
    return this.getLocalStorage("rekomendasiPembelian");
  }
  resetKonfirmasi():void{
    this.plannerKonfirmasi=[];
  }
  addKonfirmasiPembelian(reksadana:PlannerReksadana)
  {
    var konfirmasi:PlannerKonfirmasi;
    konfirmasi={
      id_jenis_reksadana:this.idJenisReksadana==null?0:this.idJenisReksadana,
      biaya_pembelian:reksadana.biaya_pembelian,
      id_produk:reksadana.id_produk,
      jenis_reksadana:this.jenisReksadanaPembelian,
      minimum_amount:reksadana.minimum_amount,
      nama_produk:reksadana.nama_produk,
      nominal:0
    };
    this.searchKonfirmasi();
    
    this.plannerKonfirmasi.push(konfirmasi);
    this.setLocalStorage("plannerKonfirmasi",this.plannerKonfirmasi);
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
          this.setLocalStorage("plannerKonfirmasi",this.plannerKonfirmasi);
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
  
  
  async isRequestPembelianValid():Promise<boolean>{
    var pbs=this.getPlannerBeliState()
    if(pbs!=null)
    {
      this.plannerBeliState=pbs;
    }
    var promoValid=true;
    var valid=false;
    if(this.plannerBeliState!=undefined)
    {
      if(this.plannerBeliState.kode_promo!=undefined)
      {
        if(this.plannerBeliState.kode_promo!="")
        {promoValid=await this.isPromoValid(this.plannerBeliState.kode_promo);}
      }
      var nominalValid=this.isNominalValid()
      if(promoValid==true&&nominalValid==true)
      {
        valid=true;
      }      
    }
    
    return valid;
  }
  
  
  getMinimumTransactionPromo():number|undefined{
    return this.plannerBeliState.minimum_transaction;
  }
  
  
  isPercentageValid():boolean{
    var percentage=0;
    
    var bool=false;
    var isValid=true;
    for (let i = 0; i < this.plannerBeliState.pembelian.length; i++) {
      var element=this.plannerBeliState.pembelian[i];
      
      if(element.percentage!=undefined&&element.percentage!=null)
      {
        percentage=Number(percentage)+Number(element.percentage)
        
        if(element.percentage!=0&&element.id_produk==undefined)
        {
          
          bool=true;
        }
      }
      
      
    }
    if(percentage!=100||bool==true)
    {
      
      isValid=false;
    }
    
    return isValid;
  }
  
  isNominalValid():boolean{
    var totalMinimumPembelian:number=0;
    var isNominalValid=true;
    var isMinPembelianValid:boolean=true;
    var isAmountValid=true;
    if(this.isPercentageValid()==true)
    { 
      for (let i = 0; i < this.plannerBeliState.pembelian.length; i++) {
        var element=this.plannerBeliState.pembelian[i];
        if(element.minimum_pembelian!=undefined)
        {
          totalMinimumPembelian= Number(totalMinimumPembelian)+Number(element.minimum_pembelian);
        }        
      }
      
      
      if(this.plannerBeliState.nominal_pembelian!=undefined)
      {
        
        if(this.plannerBeliState.nominal_pembelian<0)
        {
          
          isAmountValid=false;
        }
        if(this.plannerBeliState.nominal_pembelian<totalMinimumPembelian)
        {
          isMinPembelianValid=false;
        }
      }
      else{
        isAmountValid=false;
      }
      
      if(isAmountValid==false||isMinPembelianValid==false)
      {
        
        isNominalValid=false;
        
      }
      
      return isNominalValid;
      
      
    }
    else{
      isNominalValid=false;
    }
    return isNominalValid;
    
  }
  getPromoList():Observable<any>{
    this.updateHeader();
    const url=environment.promoPlannerUrl;
    
    return this.http.get(url,this.httpOptions);
  }
  async isPromoValid(kode:string){
    var response= await this.getPromoList().toPromise();
    var exist:boolean=false;
    if(response.output_schema.promotions!=null){
      response.output_schema.promotions.forEach((element:PlannerPromo) => {
        if(element.kode_promo==kode)
        {
          this.plannerBeliState.cashback=element.cashback;
          this.plannerBeliState.minimum_transaction=element.minimum_transaction;
          this.setLocalStorage("plannerBeliState",this.plannerBeliState);
          exist=true;
        }
      });
      
    }
    
    //console.log("RESPONSE: ",response);
    //console.log(exist);
    return exist;
  }
  
  setIdDetail(idDetail:number):void{
    this.idDetail=idDetail;
    //console.log(this.idDetail)
    this.clearLocalStorage("plannerBeliState"); 
    this.setLocalStorage("idDetail",idDetail);
  }
  getIdDetail():number|null{
    //console.log(this.getLocalStorage("idDetail"));
    return this.getLocalStorage("idDetail");
  }
  setPlannerPromo(kode:string):void
  {
    this.plannerBeliState.kode_promo=kode;
    this.setLocalStorage("plannerBeliState",this.plannerBeliState);
  }
  setPlannerBeliState(p:PlannerBeliState):void{
    this.plannerBeliState=p;
    this.setLocalStorage("plannerBeliState",this.plannerBeliState);
  }
  getPlannerBeliState():PlannerBeliState|null{
   return this.getLocalStorage("plannerBeliState");
  }
  setJenisReksadanaPembelian(jenis:string):void{
    this.jenisReksadanaPembelian=jenis;
    this.setLocalStorage("jenisReksadanaPembelian",this.jenisReksadanaPembelian);
  }
  getJenisReksadanaPembelian():string{
    return this.getLocalStorage("jenisReksadanaPembelian");
    
  }
  setIdJenisReksadana(num:number):void{
    this.idJenisReksadana=num;
    this.setLocalStorage("idJenisReksadana",this.idJenisReksadana);
  }
  getIdJenisReksadana():number|null{
    return this.getLocalStorage("idJenisReksadana");
  }
  getListReksadana(idJenis:number):Observable<any>{
    this.updateHeader();
    const url=environment.listReksadanaPlannerUrl+'/'+idJenis;
    return this.http.get(url,this.httpOptions);
  }
  
  
  doPembelian(pinMd5:string):any{
    this.updateHeader();
    const url=environment.plannerPembelianUrl;
    if(this.preparePembelianRequest())
    {
      this.plannerBeliState={
        nominal_pembelian:0,
        pembelian:[{
          id_jenis_reksadana:0,nama_plan:""
        }]
      };
      //console.log(this.requestPembelian);
    var bca_id = this.localStorage.retrieve("bca_id")
    var token = this.localStorage.retrieve("token")
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT,DELETE',
        'Access-Control-Allow-Origin': '*',
        'Identity': 'ERICIMPOSTORNYA',
        'Bca-id':String(bca_id),
        'Token':String(token),
        'Pin':pinMd5
      })
    }
      
      return this.http.post(url,this.requestPembelian,httpOptions);
    }
    return null;
    //return this.http.post(url,this.requestPembelian,this.httpOptions);
  }
  
  doPenjualan(pinMd5:string):any{
    this.updateHeader();
    const url=environment.plannerPenjualanUrl;
    var body=this.getLocalStorage("plannerJual");
    if(body!=null)
    {
      
      var bca_id = this.localStorage.retrieve("bca_id")
      var token = this.localStorage.retrieve("token")
      var httpOptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT,DELETE',
          'Access-Control-Allow-Origin': '*',
          'Identity': 'ERICIMPOSTORNYA',
          'Bca-id':String(bca_id),
          'Token':String(token),
          'Pin':pinMd5
        })
      }
      
      return this.http.post(url,body,httpOptions);
    }
    return null;
    //return this.http.post(url,this.requestPembelian,this.httpOptions);
  }


  preparePembelianRequest():boolean{
    var pbs=this.getPlannerBeliState();

    if(pbs==null)
    {
      return false;
    }
    else{
      this.plannerBeliState=pbs;
    }


    var idDetail=this.getIdDetail();

    if(idDetail==null)
    {
      return false;
    }
    else{
      this.idDetail=idDetail;
    }
var nominal_pembelian:number;
    if(this.plannerBeliState.nominal_pembelian)
    {
      nominal_pembelian=this.plannerBeliState.nominal_pembelian;
    }
    else{
      return false;
    }
    var reksadana:PlannerProduct[]=[];
    var productReady:boolean=false;
    var requestReady:boolean=false;
    //console.log(this.plannerBeliState);
    for (let i = 0; i < this.plannerBeliState.pembelian.length; i++) {
      if(this.plannerBeliState.pembelian[i].id_produk!=undefined&&this.plannerBeliState.nominal_pembelian!=undefined&&this.plannerBeliState.pembelian[i].percentage!=undefined){
        var num:number|undefined=this.plannerBeliState.pembelian[i].id_produk==undefined?0:this.plannerBeliState.pembelian[i].id_produk;
        var id:number=num!=undefined?num:0;
        var p:number|undefined=this.plannerBeliState.pembelian[i].percentage;
        var percentage:number=p!=undefined?p:0;
        productReady=true;
        reksadana.push({
          id_produk:Number(id),
          nominal:this.plannerBeliState.nominal_pembelian*percentage/100
        });
      }
      
    }
    if(this.idDetail!=null)
    {
    
      requestReady=true;
      this.requestPembelian={
        id_plan:Number(this.idDetail),
        total_beli:nominal_pembelian,
        kode_promo:this.plannerBeliState.kode_promo!=undefined?this.plannerBeliState.kode_promo:"",
        products:reksadana
      };
    }
    //console.log('product:',productReady,'request: ',requestReady);
    if(productReady==true&&requestReady==true)
    {
      return true;
    }
    else{
      return false;
    }
    
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
