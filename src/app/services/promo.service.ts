import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'
import { GeturlService } from './geturl.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Objectives } from '../models/Promotion';
var CryptoJS = require("crypto-js");

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

export class PromoService {

  selectedObjective : Objectives;
  encryptedObject: string;
  decryptedObject: string;
  secretKey : string = "Wellme"
  
 constructor(private http:HttpClient,private getUrl : GeturlService,
  private session : LocalStorageService) {
   
 }

 getPromo():Observable<any>{
      const url= this.getUrl.getPromoUrl();
      var bca_id = this.session.retrieve("bca_id")
      var token = this.session.retrieve("token")
      var httpOptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
          'Access-Control-Allow-Origin': '*',
          'Identity':'ERICIMPOSTORNYA',
          'Bca-Id': String(bca_id),
          'Token':String(token),
        })
      }
      return this.http.get(url,httpOptions);
  }

  klaimPromo(kode_promo :string):Observable<any>{
    const url= this.getUrl.getKlaimPromoUrl();
    var bca_id = this.session.retrieve("bca_id")
    var token = this.session.retrieve("token")
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
        'Access-Control-Allow-Origin': '*',
        'Identity':'ERICIMPOSTORNYA',
        'Bca-Id': String(bca_id),
        'Token':String(token),
      })
    }
    var kodepromo : any
    kodepromo={
      kode_promo:kode_promo
    };

    return this.http.put(url,kodepromo,httpOptions);
  }

  activatedPromo(kode_promo :string):Observable<any>{
    const url= this.getUrl.getActivedPromoUrl();
    var bca_id = this.session.retrieve("bca_id")
    var token = this.session.retrieve("token")
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
        'Access-Control-Allow-Origin': '*',
        'Identity':'ERICIMPOSTORNYA',
        'Bca-Id': String(bca_id),
        'Token':String(token),
      })
    }
    var kodepromo : any
    kodepromo={
      kode_promo:kode_promo
    };

    return this.http.post(url,kodepromo,httpOptions);
  }

  selectPromo(promo : Objectives){
    this.selectedObjective = promo
    this.encryptedObject = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(this.selectedObjective), this.secretKey).toString());
    this.session.store("SelectedPromo",this.encryptedObject);
  }

  getSelectedPromo() : Objectives{
    var deData= CryptoJS.AES.decrypt(decodeURIComponent(this.session.retrieve("SelectedPromo")), this.secretKey); 

    try {
      this.selectedObjective = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    } catch(e) {
      this.selectedObjective = {
              kode_promo:"-1",
              title : "-1",
              subtitle :  "-1" ,
              description :  "-1" ,
              current_amount :  -1 ,
              target_akumulasi : -1  ,
              cashback :  -1 ,
              date_available : "-1",
      }
    }

    // try {
    //   this.selectedObjective = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    // } catch (e) {
    //    this.selectedObjective = {
    //       kode_promo:"-1",
    //       title : "-1",
    //       subtitle :  "-1" ,
    //       description :  "-1" ,
    //       current_amount :  1 ,
    //       target_akumulasi : 1  ,
    //       cashback :  "-1" ,
    //       date_available : "-1",
    //    }
    // }
    // this.selectedObjective = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    //console.log(this.selectedObjective)
    return this.selectedObjective
    
  }

}