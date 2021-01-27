import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-beli-reksadana',
  templateUrl: './beli-reksadana.component.html',
  styleUrls: ['./beli-reksadana.component.css']
})
export class BeliReksadanaComponent implements OnInit {
  plannerId:number|null;
  tipe_resiko:string="";
  detail_resiko:any=[];
  namaPlan:string|null;
  rekomendasiPembelian:number|null;
  constructor(private router:Router,private plannerService:PlannerService,private location:Location) {}
  
  ngOnInit(): void {
    this.checkState();

  }
  
  getProfileResiko():void{
    this.plannerService.getPorfileResiko().subscribe(response=>{
      this.tipe_resiko=response.output_schema.tipe_resiko;
      this.detail_resiko=response.output_schema.detail_resiko;
    })
  }
  
  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    if(this.plannerId==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
    else{
      this.getProfileResiko();
      this.namaPlan=this.plannerService.getNamaPlannerDetail();
      this.rekomendasiPembelian=this.plannerService.getRekomendasiPembelian();
      if(this.namaPlan==null||this.rekomendasiPembelian==null)
      {
        this.router.navigate(['/financial-planner/planner-list']);
      }
    }
  }

  increasePercentage(num:number):void{
    this.detail_resiko[num].percentage=Number(this.detail_resiko[num].percentage)+5;
  }
  decreasePercentage(num:number):void{
    this.detail_resiko[num].percentage=Number(this.detail_resiko[num].percentage)-5;
  }
  
  goBack():void{
    this.location.back();
  }
  goToListReksadana(num:number):void{
    this.plannerService.setIdJenisReksadana(num);
    this.router.navigate(['./list-reksadana']);
  }
}
