import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ResponseApi } from './models/ResponseApi';
import { CheckSessionService } from './services/check-session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'wellme-project';

  constructor(private checkSession: CheckSessionService, private session:LocalStorageService,private router : Router) { }

  ngOnInit(): void {
    this.checkSession.checkSessionFirst().subscribe((response : ResponseApi)=>{
      if(response.output_schema.session.message=="SUKSES"){
        this.session.store("token",response.output_schema.session.new_token);
        this.router.navigate(['/index'])
      }else{
        this.checkSession.logout()
      }
    },(error)=>{
      this.checkSession.logout()
    })

  }
}

