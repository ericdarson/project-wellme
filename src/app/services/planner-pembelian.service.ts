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
@Injectable({
  providedIn: 'root'
})
export class PlannerPembelianService {
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
      'Bca-id':'jeje',
      'Token':'A905AB43ABF8BB33F532FAB977C1B80A'
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
  constructor(private http:HttpClient) {
  }
  setNamaPlannerDetail(nama:string|null):void{
    this.namaPlannerDetail=nama;
  }
  getNamaPlannerDetail():string|null{
    return this.namaPlannerDetail;
  }
  getPorfileResiko():Observable<any>{
    const url=environment.profileResikoUrl;
    return this.http.get(url,this.httpOptions);
  }
    
  setRekomendasiPembelian(num:number|null):void{
    this.rekomendasiPembelian=num;
  }
  getRekomendasiPembelian():number|null{
    return this.rekomendasiPembelian;
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
  
  
  async isRequestPembelianValid():Promise<boolean>{
    var promoValid=true;
    var valid=false;
    if(this.plannerBeliState!=undefined)
    {
      if(this.plannerBeliState.kode_promo!=undefined)
      {
        promoValid=await this.isPromoValid(this.plannerBeliState.kode_promo);
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
    const url=environment.promoPlannerUrl;
    
    return this.http.get(url,this.httpOptions);
  }
  async isPromoValid(kode:string){
    var response= await this.getPromoList().toPromise();
    var exist:boolean=false;
    response.output_schema.promotions.forEach((element:PlannerPromo) => {
      if(element.kode_promo==kode)
      {
        this.plannerBeliState.cashback=element.cashback;
        this.plannerBeliState.minimum_transaction=element.minimum_transaction;
        exist=true;
      }
    });
    
    console.log("RESPONSE: ",response);
    console.log(exist);
    return exist;
  }
  
  setIdDetail(idDetail:number):void{
    
    this.idDetail=idDetail;
  }
  getIdDetail():number|null{
    
    return this.idDetail;
  }
  setPlannerPromo(kode:string):void
  {
    this.plannerBeliState.kode_promo=kode;
  }
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
  getListReksadana(idJenis:number):Observable<any>{
    const url=environment.listReksadanaPlannerUrl+'/'+idJenis;
    return this.http.get(url,this.httpOptions);
  }


  doPembelian(pinMd5:string):any
  {
    return "";
  }
}
