import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeturlService } from './geturl.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  @Output() login:string="";
  constructor(private http:HttpClient,private sharedService:SharedService, private session:LocalStorageService,private router:Router) { 

  }
  
  checkSession(){
    const url= environment.checkSessionUrl;
      var bca_id=this.session.retrieve("bca_id")==undefined||this.session.retrieve("bca_id")==null?"":this.session.retrieve("bca_id")
      var token=this.session.retrieve("token")==undefined||this.session.retrieve("token")==null?"":this.session.retrieve("token")
      
      if(bca_id == "" ){
        this.router.navigate(['/login'])
      }else{
        var headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
            'Access-Control-Allow-Origin': '*',
            'Identity':'ERICIMPOSTORNYA',
            'bca-id': String(bca_id),
            'token':String(token),
          })
        this.sharedService.requestConn("post",url,{},headers).subscribe((response:any) =>{
          if(response.output_schema.session.message=="SUKSES"){
            this.session.store("token",response.output_schema.session.new_token);
          }
        },error=>{
          
        })
      }
  }

  checkSessionFirst():Observable<any>{
    const url= environment.checkSessionUrl;
    var bca_id=this.session.retrieve("bca_id")==undefined||this.session.retrieve("bca_id")==null?"":this.session.retrieve("bca_id")
    var token=this.session.retrieve("token")==undefined||this.session.retrieve("token")==null?"":this.session.retrieve("token")
    
    
      var headers= new HttpHeaders({
          'Content-Type':'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
          'Access-Control-Allow-Origin': '*',
          'Identity':'ERICIMPOSTORNYA',
          'bca-id': String(bca_id),
          'token':String(token),
        })

      return this.sharedService.requestConn("post",url,{},headers);
      // return this.http.post(url,{},httpOptions) 
  }

  logout(){
    this.session.clear('token');
    this.session.clear('bca_id');
    this.session.clear("dialogTutorialBackward")
    this.router.navigate(['/login'])
  }


}
