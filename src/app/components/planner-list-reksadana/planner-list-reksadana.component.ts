import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-list-reksadana',
  templateUrl: './planner-list-reksadana.component.html',
  styleUrls: ['./planner-list-reksadana.component.css']
})
export class PlannerListReksadanaComponent implements OnInit {
  plannerId:number|null;
  tempVar : any[]
  idJenis:number|null;
  listReksadana:any=[];
  constructor(private router : Router, private location:Location,private route: ActivatedRoute,private plannerService:PlannerService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['../home'], {relativeTo: this.route})
  }
  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    this.idJenis=this.plannerService.getIdJenisReksadana();
    if(this.plannerId==null||this.idJenis==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
    else{
      this.plannerService.getListReksadana(this.idJenis).subscribe(response=>{
        this.listReksadana=response.output_schema;
      })
    }
  }
  
}
