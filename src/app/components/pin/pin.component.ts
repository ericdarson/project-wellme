import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupSyaratKetentuanComponent } from 'src/app/popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  
  constructor() { }
  pin:number[]=[]
  activeStatus:string[]=["dot","dot","dot","dot","dot","dot"];
  ngOnInit(): void {
    
  }
  
  buttonPressed(num:number):void{
    if(this.pin.length<6 && num!=-1){
      this.activeStatus[this.pin.length]="dot-active";
      this.pin.push(num);
      
    }
    
    if(num==-1) {
     this.pin.pop();
     this.activeStatus[this.pin.length]="dot";
    }

  }
  

 
  
  
  
}
