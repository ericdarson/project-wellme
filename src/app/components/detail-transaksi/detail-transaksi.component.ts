import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlannerBeliState, StatePembelian } from 'src/app/models/planner-beli-state';
@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.component.html',
  styleUrls: ['./detail-transaksi.component.css']
})
export class DetailTransaksiComponent implements OnInit {
  biayaPembelian:number=0;
  totalBiaya:number=0;
  totalTransaksi:number=0;
  totalPromo:number=0;
  constructor(public dialog: MatDialog,private router:Router,private plannerService:PlannerPembelianService,private location:Location,private route : ActivatedRoute){ }
  plannerBeliState:PlannerBeliState|null;
  ngOnInit(): void {
    this.checkState();
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
}
