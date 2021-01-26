import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  bca_id : string;
  hide :boolean=false;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  loginClicked(){
    this.router.navigate(['../index']);
  }

}