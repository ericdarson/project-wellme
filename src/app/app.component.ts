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
    

  }
}

