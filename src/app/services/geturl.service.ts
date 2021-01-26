import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeturlService implements OnInit{

  constructor( private router: Router,private session:LocalStorageService) { 
    this.checkUserLogin()
  }

  ngOnInit(): void {
    
  } 

  checkUserLogin(){
    console.log("masuk check user login")
    if(this.session.retrieve("token") == "" || this.session.retrieve("bca_id") == ""||
      this.session.retrieve("token") == null  || this.session.retrieve("bca_id") == null||
      this.session.retrieve("token") == undefined  || this.session.retrieve("bca_id") == undefined
    ){
      this.logout();
    }
  }


  getLoginUrl(){
    return environment.loginUrl;
  }

  getProfileUrl(){
    return environment.profileUrl;
  }

  logout(){
    this.session.clear('token');
    this.session.clear('bca_id');
    this.router.navigate(['/login'])
  }

}
