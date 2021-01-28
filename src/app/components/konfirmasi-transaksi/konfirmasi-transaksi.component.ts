import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerBeliState, StatePembelian } from 'src/app/models/planner-beli-state';
import { InformasiProdukComponent } from 'src/app/popup/informasi-produk/informasi-produk.component';
import { PopupSyaratKetentuanComponent } from 'src/app/popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { SyaratKetentuanPembelianComponent } from 'src/app/popup/syarat-ketentuan-pembelian/syarat-ketentuan-pembelian.component';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';

@Component({
  selector: 'app-konfirmasi-transaksi',
  templateUrl: './konfirmasi-transaksi.component.html',
  styleUrls: ['./konfirmasi-transaksi.component.css']
})
export class KonfirmasiTransaksiComponent implements OnInit {
  plannerBeliState:PlannerBeliState|null;
  biayaPembelian:number=0;
  totalBiaya:number=0;
  totalTransaksi:number=0;
  totalPromo:number=0;
  snkChecked:boolean=false;
  constructor(public dialog: MatDialog,private router:Router,private plannerService:PlannerPembelianService,private location:Location,private route : ActivatedRoute) { }
  
  ngOnInit(): void {
    this.checkState();
  }
  
  goBack()
  {
    this.location.back();
  }
  async checkState():Promise<void>{
    if(await this.plannerService.isRequestPembelianValid()==false)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    else{
      this.plannerBeliState=this.plannerService.getPlannerBeliState();
      this.plannerBeliState!=null?this.plannerBeliState.pembelian.forEach((element:StatePembelian) => {
        var biaya=0;
        var totalBiaya=0;
        console.log(element);
        if(element.biaya_pembelian!=undefined&&element.percentage&&this.plannerBeliState?.nominal_pembelian!=undefined)
        {
          biaya=Number((element.biaya_pembelian/100)*(element.percentage/100)*this.plannerBeliState.nominal_pembelian);
          totalBiaya=Number(totalBiaya)+Number(biaya);
          this.biayaPembelian=this.biayaPembelian+Number(totalBiaya);
          this.totalBiaya=Number(this.totalBiaya)+Number((element.percentage/100)*this.plannerBeliState.nominal_pembelian);
 
        }
      }):null;
      
      if(this.plannerBeliState?.cashback!=undefined)
      {
        this.totalPromo=this.plannerBeliState.cashback;
      }
      this.totalTransaksi=this.totalBiaya+this.biayaPembelian-this.totalPromo
    }
  }
  
  openIPPopup():void{
    const dialogRef = this.dialog.open(InformasiProdukComponent, {
      height:'500px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
  openSKPopup():void{
    const dialogRef = this.dialog.open(SyaratKetentuanPembelianComponent, {
      height:'500px',
      width: '400px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  
}
