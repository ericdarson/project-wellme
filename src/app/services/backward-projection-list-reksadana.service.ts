import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseApi } from '../models/ResponseApi'
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import {environment} from 'src/environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from './shared.service';



@Injectable({
  providedIn: 'root'
})

export class BackwardProjectionListReksadanaService {
  datepipe: DatePipe
  jenisreksa:string="";
  namaProduk:string="";
  httpHeader = new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
    'Access-Control-Allow-Origin': '*',
  })
  constructor(private http:HttpClient, private cookieService:CookieService,private sharedService : SharedService) { }

  ngOnInit() {

  }
  getNamaProduk(){
    return this.namaProduk;
  }
  setNamaProduk(val:string){
    this.namaProduk = val;;
  }

  setJenisReksadana(val:string){
    this.jenisreksa = val;
  }

  getJenisReksadana(){
    return this.jenisreksa;
  }

  setNabSimulation(val:any){
    this.cookieService.set("nabsimulation",val);
  }

  getNabSimulation(){
    return this.cookieService.get("nabsimulation");
  }

  setDateSimulation(val:any){
    this.cookieService.set("datesimulation",val);
  }

  getDateSimulationString(){
    return this.cookieService.get("datesimulationstring");
  }

  setDateSimulationString(val:any){
    this.cookieService.set("datesimulationstring",val);
  }

  getDateSimulation(){
    return this.cookieService.get("datesimulation");
  }

  getListJenis():Observable<ResponseApi> {
    responseApi:ResponseApi;
    return this.sharedService.requestConn("get",environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/reksadana/",{},this.httpHeader)
    // return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/reksadana/",httpOptions);
  }

  getAllProduk(idJenis:string):Observable<ResponseApi> {
    responseApi:ResponseApi;
    
    return this.sharedService.requestConn("get",environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/products/"+ idJenis,{},this.httpHeader)
    // return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/products/" + idJenis,httpOptions);
  
  }

  getDetailProduk(idProduk:string, tglChart:string):Observable<ResponseApi> {
    responseApi:ResponseApi;

    return this.sharedService.requestConn("get",environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/product/" + idProduk + "/"+tglChart,{},this.httpHeader)
    // return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/product/" + idProduk + "/"+tglChart ,httpOptions);
  }
  
  setNominal(value:number){
    this.cookieService.set("nominal",value+"");
  }

  getNominal(){
    return this.cookieService.get("nominal");
  }

  startSimulation(date:string,idproduk:string){
    return this.sharedService.requestConn("get",environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/simulation/start/" + date + "/"+idproduk+"/"+this.cookieService.get('nominal'),{},this.httpHeader)
    
    // return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/simulation/start/" + date + "/"+idproduk+"/"+this.cookieService.get('nominal'),httpOptions);
  }
  forwardSimulation(date:string, idproduk:string){
    return this.sharedService.requestConn("get",environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/simulation/forward/"+idproduk+"/"+date,{},this.httpHeader)

    // return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/simulation/forward/"+idproduk+"/"+date, httpOptions);
  }
  projectionResult(date:string, idproduk:string){
    //console.log(environment.BackwaardProjectionUrl+"/projection/"+idproduk+"/"+date)
    return this.sharedService.requestConn("get",environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/projection/"+idproduk+"/"+date,{},this.httpHeader)

    // return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/wellme/backward-projection/api/projection/"+idproduk+"/"+date, httpOptions);
  }
}
