import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { CheckSessionService } from 'src/app/services/check-session.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  bca_id : string;
  hide :boolean=true;
  password : string;
  message : string;
  isLoading : boolean = false;
  isWrongPass : boolean =false
  constructor(private router : Router,
     private session :LocalStorageService, private loginservice : LoginService,
     private checkSession: CheckSessionService ) {

   }

  ngOnInit(): void {
    this.isLoading = true
    this.checkSession.checkSessionFirst().subscribe((response : ResponseApi)=>{
      this.isLoading = false
      if(response.output_schema.session.message=="SUKSES"){   
        this.session.store("token",response.output_schema.session.new_token);
        this.router.navigate(['/index'])
      }else{
        this.checkSession.logout()
      }
    },(error)=>{
      this.isLoading = false
      this.checkSession.logout()
    })
  }

  loginClicked(){
    this.isLoading = true
    this.loginservice.login(this.bca_id,this.password).subscribe(response=>{
      //console.log(response)
     if (response.output_schema.detail_login.message=="SUKSES")
     {
       this.isLoading = false
       this.session.store("bca_id",this.bca_id);
       this.session.store("token",response.output_schema.detail_login.token);
       this.message="";
       this.router.navigate(['/index'])
       this.isWrongPass = false;
     }else if(response.output_schema.detail_login.message=="USERNAME ATAU PASSWORD SALAH"){
        this.isWrongPass = true;
        this.isLoading = false;
     }
     else{
        this.isLoading = false;
        this.isWrongPass = false;
     }
    },error=>{
      this.isLoading = false;
      this.isWrongPass = false;
    })
  }

}
