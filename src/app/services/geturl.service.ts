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
    // console.log("masuk check user login")
    if(this.session.retrieve("token") == "" || this.session.retrieve("bca_id") == ""||
      this.session.retrieve("token") == null  || this.session.retrieve("bca_id") == null||
      this.session.retrieve("token") == undefined  || this.session.retrieve("bca_id") == undefined
    ){
      // console.log("logout")
      this.logout();
    }
  }


  getLoginUrl(){
    return environment.loginUrl;
  }

  getProfileUrl(){
    this.checkUserLogin()
    return environment.profileUrl;
  }

  getPromoUrl(){
    this.checkUserLogin()
    return environment.promoUrl;
  }

  getKlaimPromoUrl(){
    this.checkUserLogin()
    return environment.claimPromoUrl;
  }

  getActivedPromoUrl(){
    this.checkUserLogin()
    return environment.activedPromoUrl;
  }

  logout(){
    this.session.clear('token');
    this.session.clear('bca_id');
    this.router.navigate(['/login'])
  }

}
