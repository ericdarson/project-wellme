import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ResponseApi } from '../models/ResponseApi';
import { CheckSessionService } from '../services/check-session.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;
  constructor(private checkSession: CheckSessionService, private session:LocalStorageService,private router : Router) { 

  
  }

  ngOnDestroy(){
    // //console.log("destroy")
   
  }

  ngOnInit(): void {
    
  }
 
}
