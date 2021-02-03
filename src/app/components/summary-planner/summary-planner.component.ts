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
  loader2:boolean=false;
loader:boolean=true;
errorMessage:string="";
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
      this.loader=false;
      this.plannerResiko=response.output_schema;
      
    })
  }
  insertPlanner():void{
    if (this.plannerService.isRequestValid())
    {
      this.loader2=true;
      this.plannerService.insertPlanner().subscribe(response=>{
        this.loader2=false;
        this.plannerService.resetVariable();
        this.route.navigate(['/financial-planner']);
      },
      (error:any)=>{
        this.loader2=false;
        this.errorMessage="Gagal Menambahkan Planner";
      }
      );
    }
  }
  
}
