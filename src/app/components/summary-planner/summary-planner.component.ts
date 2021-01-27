import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerResiko } from 'src/app/models/planner-resiko';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-summary-planner',
  templateUrl: './summary-planner.component.html',
  styleUrls: ['./summary-planner.component.css']
})
export class SummaryPlannerComponent implements OnInit {
  plannerResiko:PlannerResiko;
  
  
  constructor(private plannerService:PlannerService,private route:Router,private location:Location) { }

  ngOnInit(): void {
    this.checkState();
    this.getProfileResiko();
  }
  checkState():void{
    if(!this.plannerService.isRequestValid())
    {
      this.route.navigate(['/financial-planner/pilih-target']);
    }
  }
  goBack()
  {
    this.location.back();
  }

  getProfileResiko():void{
    this.plannerService.getPorfileResiko().subscribe(response=>{
      this.plannerResiko=response.output_schema;
      
    })
  }
  insertPlanner():void{
    if (this.plannerService.isRequestValid())
    {
      this.plannerService.insertPlanner().subscribe(response=>{
        this.plannerService.resetVariable();
        this.route.navigate(['/financial-planner']);
      });
    }
  }
  
}
