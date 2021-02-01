import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { PlannerList } from 'src/app/models/planner-list';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-financial-planner-list',
  templateUrl: './financial-planner-list.component.html',
  styleUrls: ['./financial-planner-list.component.css']
})
export class FinancialPlannerListComponent implements OnInit {
shimmering:string="block";
listDisplay:string="hidden";
notFound:string="hidden";
display:string="block";
  listPlanner:PlannerList[];
  listPlannerDisplay:any;
  loader=true;
  constructor(private router:Router,private plannerService:PlannerService) { }

  ngOnInit(): void {
    this.getListPlanner();
  }


  portofolioClicked(plan:any):void{
    this.plannerService.setIdDetail(plan.id_plan);
    this.router.navigate(['/financial-planner/detail-planner'],plan.id_plan);
  }

  getListPlanner():void{
    this.plannerService.getPlannerList().subscribe((response:ResponseApi)=>{
      this.loader=false;
      console.log(response);
      this.listPlanner=response.output_schema.list_planner;
      this.listPlanner.forEach((element:any) => {
        var round=Math.ceil(element.current/element.floor)
        this.shimmering="hidden";
        this.listPlannerDisplay="block";
      });
      if(this.listPlanner==[])
      {
        this.notFound="jflex-column";
        this.listPlannerDisplay="hidden";
      }
    },(error)=>{
      var err=error.error.error_schema.error_code;
      if(err=="BIT-17-004")
      {
        this.notFound="jflex-column";
        this.listPlannerDisplay="hidden";
      }
      console.log('err-->',error);
    })
  }
}
