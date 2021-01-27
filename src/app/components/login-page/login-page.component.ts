import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
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
  constructor(private router : Router, private session :LocalStorageService, private loginservice : LoginService) {

   }

  ngOnInit(): void {
  }

  loginClicked(){
    this.isLoading = true
    this.loginservice.login(this.bca_id,this.password).subscribe(response=>{
      console.log(response)
     if (response.output_schema.detail_login.message=="SUKSES")
     {
       this.isLoading = false
       this.session.store("bca_id",this.bca_id);
       this.session.store("token",response.output_schema.detail_login.token);
       this.message="";
       this.router.navigate(['/index'])
     }
     else{
        this.isLoading = false
        this.message=response.output_schema.detail_login.message;
     }
    },error=>{
      this.isLoading = false
    })
  }

}
