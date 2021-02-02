import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerBeliState } from 'src/app/models/planner-beli-state';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerRequestJual } from 'src/app/models/planner-request-jual';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-planner-pin-jual-reksadana',
  templateUrl: './planner-pin-jual-reksadana.component.html',
  styleUrls: ['./planner-pin-jual-reksadana.component.css']
})
export class PlannerPinJualReksadanaComponent implements OnInit {

  
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
  wrongPinMessage:string;
  wrongPinClass:Boolean=false;
  loader:boolean=false;
  plannerDetail:PlannerDetail;
  idDetail:number;
  requestPenjualan:PlannerRequestJual[];
  goBack()
  {
    this.location.back();
  }
  async checkState():Promise<void>{
    this.plannerDetail=this.plannerService.getLocalStorage("plannerDetail");
    this.idDetail=this.plannerService.getLocalStorage("idDetail");
    this.requestPenjualan=this.plannerService.getLocalStorage("plannerJual");
    if(this.plannerDetail==null||this.idDetail==null||this.requestPenjualan==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
  }
  buttonPressed(num:number):void{
    if(this.pin.length<6 && num!=-1 && num!=-2){
      this.activeStatus[this.pin.length]="dot-active";
      this.pin.push(num);
      
    }
    if(num==-2)
    {
      this.pin=[];
      this.activeStatus=["dot","dot","dot","dot","dot","dot"];
      console.log(this.pin);
    }
    if(num==-1) {
      this.pin.pop();
      this.activeStatus[this.pin.length]="dot";
    }
    if(this.pin.length==6)
    {
      this.loader=true;
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
      var pembelian=this.plannerService.doPembelian(this.pinMD5);
      if(pembelian!=null)
      {
        this.wrongPinClass=false;
        this.wrongPinMessage="";
        pembelian.subscribe((response:any)=>{
          this.plannerService.clearLocalStorage("plannerBeliState");
          this.plannerService.clearLocalStorage("plannerKonfirmasi");
          this.plannerService.setLocalStorage("detailTransaksi",response.output_schema);
          this.loader=false;
          this.router.navigate(['../detail-transaksi'],{relativeTo:this.route}
          
          )
        },(error:any)=>{
          this.loader=false;
          console.log(error);
          if(error.error.error_schema.error_message.english=="WRONG PIN"){
            this.wrongPinClass=true;
            this.wrongPinMessage="Pin yang Anda Masukan Salah" 
          }
        })
      }
      
    }
  }
  
//TODO: DO PENJUALAN BUAT SERVICE DI PLANNER
}
