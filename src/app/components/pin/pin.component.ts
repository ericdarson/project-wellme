import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerBeliState } from 'src/app/models/planner-beli-state';
import { PopupSyaratKetentuanComponent } from 'src/app/popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  
  constructor(public dialog: MatDialog,private router:Router,private plannerService:PlannerPembelianService,private location:Location,private route : ActivatedRoute){ }
  pin:number[]=[]
  activeStatus:string[]=["dot","dot","dot","dot","dot","dot"];
  ngOnInit(): void {
    this.checkState();
  }
  plannerBeliState:PlannerBeliState|null;
  biayaPembelian:number=0;
  totalBiaya:number=0;
  totalTransaksi:number=0;
  totalPromo:number=0;
  snkChecked:boolean=false;
  pinMD5:string;
  
  
  goBack()
  {
    this.location.back();
  }
  async checkState():Promise<void>{
    if(await this.plannerService.isRequestPembelianValid()==false)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
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
    if(this.pin.length==6)
    {
      const md5 = new Md5();
      var dataStrings =this.pin.map(function(value) {
        return String(value);
       });
       var strings="";
       for (let i = 0; i < dataStrings.length; i++) {
         strings+=dataStrings[i];
         
       }
       console.log(strings);
      this.pinMD5=md5.appendStr(strings).end().toString();
      this.plannerService.doPembelian(this.pinMD5);
    }
  }
  
  
  
  
  
  
}
