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
  detailTransaksi:any;
  ngOnInit(): void {
    this.checkState();
  }
  async checkState():Promise<void>{
    
    this.detailTransaksi=this.plannerService.getLocalStorage("detailTransaksi");
    if(this.detailTransaksi==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    
  }

  goToListPlanner(){
    this.plannerService.clearLocalStorage("detailTransaksi");
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
