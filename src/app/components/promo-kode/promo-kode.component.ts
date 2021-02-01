import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerPromo } from 'src/app/models/planner-promo';
import { PlannerReksadana } from 'src/app/models/planner-reksadana';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-promo-kode',
  templateUrl: './promo-kode.component.html',
  styleUrls: ['./promo-kode.component.css']
})
export class PromoKodeComponent implements OnInit {
  
  plannerId:number|null;
  tempVar : any[]
  idJenis:number|null;
  promoList:PlannerPromo[];
  namaJenisReksadana:string;
  promoKode:string;
  displayClass:string="flex";
  notFoundClass:String="hidden";
  loader:boolean=true;
  constructor(private router : Router, private location:Location,private route: ActivatedRoute,private plannerService:PlannerPembelianService) { }
  
  ngOnInit(): void {
    this.checkState();
  }
  
  goBack(){
    this.location.back();
  }
  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    if(this.plannerId==null||this.plannerService.getPlannerBeliState()==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
    else{
      this.plannerService.getPromoList().subscribe((response:ResponseApi)=>{
        this.promoList=response.output_schema.promotions;
        this.loader=false;
      },
      error=>{
        this.notFoundClass="flex";
        this.displayClass="hidden";
        this.loader=false;
      }
      )
    }
  }
  setPromoKode(kode:string):void{
    this.promoKode=kode;
    this.plannerService.setPlannerPromo(this.promoKode);
    this.router.navigate(['../beli-reksadana'],{relativeTo: this.route});
  }
}
