import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ResponseApi } from '../models/ResponseApi';
import { CheckSessionService } from '../services/check-session.service';
import { GeturlService } from '../services/geturl.service';

@Component({
  selector: 'app-backward-module',
  templateUrl: './backward-module.component.html',
  styleUrls: ['./backward-module.component.css']
})
export class BackwardModuleComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute,private getUrlService : GeturlService, private router: Router,private checkSession: CheckSessionService, private session:LocalStorageService) { }
  
  isInTutorialPage:boolean=false

  ngOnInit(): void {
    // if(this.router.url.indexOf('tutorial') > -1){
    //   this.isInTutorialPage= true
    // }
    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     if(val.url.indexOf('tutorial') > -1){
    //       this.isInTutorialPage= true
    //     }else{
    //       this.isInTutorialPage= false
    //     }
    //   }
    // });
    // this.checkSession.checkSessionFirst().subscribe((response : ResponseApi)=>{
    //   // console.log(response)
    //   if(response.output_schema.session.message=="SUKSES"){
    //     this.session.store("token",response.output_schema.session.new_token);
    //   }
    // },(error)=>{
    //   this.checkSession.logout()
    // })
    this.getUrlService.checkUserLogin();
  }

}
