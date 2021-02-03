import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerBeliState } from 'src/app/models/planner-beli-state';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';

@Component({
  selector: 'app-planner-detail-transaksi-jual',
  templateUrl: './planner-detail-transaksi-jual.component.html',
  styleUrls: ['./planner-detail-transaksi-jual.component.css']
})
export class PlannerDetailTransaksiJualComponent implements OnInit {
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
    
    this.detailTransaksi=this.plannerService.getLocalStorage("detailTransaksiJual");
    if(this.detailTransaksi==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    
  }

  goToListPlanner(){
    this.plannerService.clearLocalStorage("detailTransaksiJual");
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
