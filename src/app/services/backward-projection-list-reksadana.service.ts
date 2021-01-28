import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../models/Constants'
import { ResponseApi } from '../models/ResponseApi'
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';

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
  cons:Constants;
  datepipe: DatePipe
  tglChart:string;
  constructor(private http:HttpClient) { }

  ngOnInit() {

  }

  setTglChart(tglChart:string){
    let newDate = moment(tglChart, 'DD MMM YY')
    this.tglChart = newDate.format('DD-MM-YYYY');
  }

  getListJenis():Observable<ResponseApi> {
    this.cons = new Constants();
    responseApi:ResponseApi;
    return this.http.get<ResponseApi>(this.cons.BACKWARD_PROJECTION_URL+"/reksadana",httpOptions);
  }

  getAllProduk(idJenis:string):Observable<ResponseApi> {
    this.cons = new Constants();
    responseApi:ResponseApi;
    return this.http.get<ResponseApi>(this.cons.BACKWARD_PROJECTION_URL+"/products/" + idJenis,httpOptions);
  
  }

  getDetailProduk(idProduk:string):Observable<ResponseApi> {
    if(this.tglChart == null) {
      this.tglChart = "01-01-2019"
    }
    this.cons = new Constants();
    responseApi:ResponseApi;
    return this.http.get<ResponseApi>(this.cons.BACKWARD_PROJECTION_URL+"/product/" + idProduk + "/"+this.tglChart ,httpOptions);
  }
}
