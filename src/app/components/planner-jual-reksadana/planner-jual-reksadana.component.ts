import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerRequestJual } from 'src/app/models/planner-request-jual';
import { SyaratKetentuanPembelianComponent } from 'src/app/popup/syarat-ketentuan-pembelian/syarat-ketentuan-pembelian.component';
import { SyaratKetentuanPenjualanComponent } from 'src/app/popup/syarat-ketentuan-penjualan/syarat-ketentuan-penjualan.component';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-jual-reksadana',
  templateUrl: './planner-jual-reksadana.component.html',
  styleUrls: ['./planner-jual-reksadana.component.css']
})
export class PlannerJualReksadanaComponent implements OnInit {
  
  plannerDetail:PlannerDetail;
  kategori:string="";
  totalAsset:number=0;
  idDetail:number;
  snkChecked:boolean=false;
  requestPenjualan:PlannerRequestJual[]=[];
  totalBiayaPenjualan:number=0;
  errMessage:string="";
  pvalid:boolean=true;
  errDisplay:boolean=false;
  constructor(private dialog:MatDialog,private location:Location,private plannerService:PlannerService,private router:Router,private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.checkState();
  }
  
  checkState():void{
    
    this.plannerDetail=this.plannerService.getLocalStorage("plannerDetail");
    this.idDetail=this.plannerService.getLocalStorage("idDetail");
    if(this.plannerDetail==null||this.idDetail==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    else{
      for (let i = 0; i < this.plannerDetail.portfolio.length; i++) {
        if(this.plannerDetail.portfolio[i].status=="Unit")
        {
          console.log(this.plannerDetail.portfolio[i]);
          this.totalBiayaPenjualan=Number(this.totalBiayaPenjualan)+Number((this.plannerDetail.portfolio[i].biaya_penjualan/100)*this.plannerDetail.portfolio[i].asset);
          this.totalAsset=Number(this.totalAsset)+Number(this.plannerDetail.portfolio[i].asset);
          if(Number(this.plannerDetail.portfolio[i].jumlah_unit)<Number(this.plannerDetail.portfolio[i].minimal_penjualan))
          {
            if(this.pvalid==true)
            {
              this.pvalid=false;
              this.errMessage+="Minimal Unit Penjualan Reksadana "+this.plannerDetail.portfolio[i].nama_produk+" Adalah "+this.plannerDetail.portfolio[i].minimal_penjualan+" dan Unit yang dimiliki adalah "+this.plannerDetail.portfolio[i].jumlah_unit;
            }
            else{
              this.errMessage+=", Minimal Unit Penjualan Reksadana "+this.plannerDetail.portfolio[i].nama_produk+" Adalah "+this.plannerDetail.portfolio[i].minimal_penjualan+" dan Unit yang dimiliki adalah "+this.plannerDetail.portfolio[i].jumlah_unit;
            }
          }
          this.requestPenjualan.push({
            id_plan:Number(this.idDetail),
            id_produk:Number(this.plannerDetail.portfolio[i].id_produk),
            jumlah_unit:Number(this.plannerDetail.portfolio[i].jumlah_unit)
          });
        }
      }
      this.totalAsset=Number(this.totalAsset);
      this.plannerService.setLocalStorage("plannerJual",this.requestPenjualan);
    }
    
  }
  
  goBack(){
    this.location.back();
  }
  openSKPopup():void{
    const dialogRef = this.dialog.open(SyaratKetentuanPenjualanComponent, {
      height:'500px',
      width: '400px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
  cancelingTransaction(){
    this.plannerService.clearLocalStorage("pvalid");
    this.plannerService.clearLocalStorage("plannerJual");
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  
  
  goToPin(){
    if(this.pvalid==false)
    {
      this.errDisplay=true;
    }
    else{
      this.plannerService.setLocalStorage("pvalid",this.pvalid);
      this.router.navigate(['../pin-jual'],{relativeTo:this.route});
    }
    
  }
  
}
