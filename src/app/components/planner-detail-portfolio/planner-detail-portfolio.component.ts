import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-detail-portfolio',
  templateUrl: './planner-detail-portfolio.component.html',
  styleUrls: ['./planner-detail-portfolio.component.css']
})
export class PlannerDetailPortfolioComponent implements OnInit {
  plannerId:number|null;
  constructor(private router:Router,private plannerService:PlannerPembelianService,private location:Location) {}
  plan:any;
  ngOnInit(): void {
    this.checkState();
  }


  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    this.plan=this.plannerService.getLocalStorage("plannerDetail");
    if(this.plannerId==null||this.plan==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
  }

  goBack():void{
    this.location.back();
  }
  

}
