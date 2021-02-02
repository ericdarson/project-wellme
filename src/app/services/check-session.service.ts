import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeturlService } from './geturl.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  @Output() login:string="";
  constructor(private http:HttpClient, private session:LocalStorageService,private router:Router) { 

  }
  
  checkSession(){
    const url= environment.checkSessionUrl;
      var bca_id=this.session.retrieve("bca_id")==undefined||this.session.retrieve("bca_id")==null?"":this.session.retrieve("bca_id")
      var token=this.session.retrieve("token")==undefined||this.session.retrieve("token")==null?"":this.session.retrieve("token")
      
      if(bca_id == "" ){
        this.router.navigate(['/login'])
      }else{
        var httpOptions={
          headers:new HttpHeaders({
            'Content-Type':'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
            'Access-Control-Allow-Origin': '*',
            'Identity':'ERICIMPOSTORNYA',
            'bca-id': String(bca_id),
            'token':String(token),
          })
        };
        console.log(httpOptions)
        this.http.post(url,{},httpOptions).subscribe((response:any) =>{
          console.log(response)
          if(response.output_schema.session.message=="SUKSES"){
            this.session.store("token",response.output_schema.session.new_token);
          }
          else{
            this.logout()
          }
        },error=>{

        })
      }
  }

  logout(){
    this.session.clear('token');
    this.session.clear('bca_id');
    this.router.navigate(['/login'])
  }


}
