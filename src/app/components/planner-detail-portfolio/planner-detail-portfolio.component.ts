import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-detail-portfolio',
  templateUrl: './planner-detail-portfolio.component.html',
  styleUrls: ['./planner-detail-portfolio.component.css']
})
export class PlannerDetailPortfolioComponent implements OnInit {
  plannerId:number|null;
  constructor(private router:Router,private plannerService:PlannerService,private location:Location) {}
 
  ngOnInit(): void {
    this.checkState();
  }


  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    if(this.plannerId==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
  }

  goBack():void{
    this.location.back();
  }
  

}
