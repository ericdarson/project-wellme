import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css']
})
export class PromoListComponent implements OnInit {
  activeState:string[]=["btn-active","btn-non-active","btn-non-active"]
  constructor() { }
  
  ngOnInit(): void {
  }
  
  toggleBtn(num:number):void{
    if(num==0)
    {
      this.activeState=["btn-active","btn-non-active","btn-non-active"];
    }
    else if(num==1){
      this.activeState=["btn-non-active","btn-active","btn-non-active"];
    }
    else if(num==2){
      this.activeState=["btn-non-active","btn-non-active","btn-active"];
    }
  }
  
  
}
