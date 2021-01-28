import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseApi } from '../models/ResponseApi'
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import {environment} from 'src/environments/environment'
import { CookieService } from 'ngx-cookie-service';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
    'Access-Control-Allow-Origin': '*',
  })
}
@Injectable({
  providedIn: 'root'
})

export class BackwardProjectionListReksadanaService {
  datepipe: DatePipe
  constructor(private http:HttpClient, private cookieService:CookieService) { }

  ngOnInit() {

  }

  getListJenis():Observable<ResponseApi> {
    responseApi:ResponseApi;
    return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/reksadana",httpOptions);
  }

  getAllProduk(idJenis:string):Observable<ResponseApi> {
    responseApi:ResponseApi;
    return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/products/" + idJenis,httpOptions);
  
  }

  getDetailProduk(idProduk:string, tglChart:string):Observable<ResponseApi> {
    responseApi:ResponseApi;
    return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/product/" + idProduk + "/"+tglChart ,httpOptions);
  }
  
  setNominal(value:number){
    this.cookieService.set("nominal",value+"");
  }

  getNominal(){
    return this.cookieService.get("nominal");
  }

  startSimulation(date:string,idproduk:string){
    return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/simulation/start/" + date + "/"+idproduk+"/"+this.cookieService.get('nominal'),httpOptions);
  }
  forwardSimulation(date:string, idproduk:string){
    return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/simulation/forward/"+idproduk+"/"+date, httpOptions);
  }
  projectionResult(date:string, idproduk:string){
    return this.http.get<ResponseApi>(environment.BackwaardProjectionUrl+"/projection/"+idproduk+"/"+date, httpOptions);
  }
}
