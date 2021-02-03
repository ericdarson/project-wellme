import { Location } from '@angular/common';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerPromo } from 'src/app/models/planner-promo';
import { PlannerReksadana } from 'src/app/models/planner-reksadana';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { GeturlService } from 'src/app/services/geturl.service';
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
  isFailedToLoad:boolean=false;
  notFound:boolean=false;
  constructor(private router : Router, private location:Location,private route: ActivatedRoute,private plannerService:PlannerPembelianService,private sharedService:GeturlService) { }
  
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
        console.log("Promo-->",this.promoList);
        this.loader=false;
      },
      error=>{
        console.log("Error-->",error);
        this.notFoundClass="flex";
        this.displayClass="hidden";
        this.loader=false;
        if(error.status == 403){
          this.sharedService.logout()
        }else if(error.status==404){
          this.loader=false;
          this.notFound=true;
        }
        else{
          //this.isLoading=false;
          this.isFailedToLoad = true;
        }
      }
      )
    }
  }
  setPromoKode(kode:string):void{
    this.promoKode=kode;
    this.plannerService.setPlannerPromo(this.promoKode);
    this.router.navigate(['../beli-reksadana'],{relativeTo: this.route});
  }
  retryClicked(){
    this.loader=true;
    this.isFailedToLoad = false;
    this.checkState();
  }
}
