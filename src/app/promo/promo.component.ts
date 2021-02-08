import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ResponseApi } from '../models/ResponseApi';
import { CheckSessionService } from '../services/check-session.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  constructor(private router: Router,private checkSession: CheckSessionService, private session:LocalStorageService) { }

  ngOnInit(): void {
    this.checkSession.checkSessionFirst().subscribe((response : ResponseApi)=>{
      if(response.output_schema.session.message=="SUKSES"){
        this.session.store("token",response.output_schema.session.new_token);
      }else{
        this.checkSession.logout()
      }
    },(error)=>{
      this.checkSession.logout()
    })
  }

}
