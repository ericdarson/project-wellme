import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import { PlannerService } from 'src/app/services/planner.service';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerReksadana } from 'src/app/models/planner-reksadana';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';

import { PlannerProductComponent } from '../planner-product/planner-product.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GeturlService } from 'src/app/services/geturl.service';
@Component({
  selector: 'app-planner-list-reksadana',
  templateUrl: './planner-list-reksadana.component.html',
  styleUrls: ['./planner-list-reksadana.component.css']
})
export class PlannerListReksadanaComponent implements OnInit {
  plannerId:number|null;
  tempVar : any[]
  idJenis:number|null;
  listReksadana:PlannerReksadana[]=[];
  namaJenisReksadana:string;
  loader=true;
  isFailedToLoad :boolean=false;
  notFound:boolean=false;
  constructor(private router : Router, private location:Location,private route: ActivatedRoute,private plannerService:PlannerPembelianService, private bottomSheet: MatBottomSheet,private sharedService:GeturlService) { }
  
  ngOnInit(): void {
    this.checkState();
    
  }
  
  openBottomSheet(reksa:any): void {
    this.plannerService.setLocalStorage("detail-reksadana",reksa);
    this.bottomSheet.open(PlannerProductComponent);
  }
  goBack(){
    this.location.back();
  }
  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    this.idJenis=this.plannerService.getIdJenisReksadana();
    this.namaJenisReksadana=this.plannerService.getJenisReksadanaPembelian();
    if(this.plannerId==null||this.idJenis==null||this.namaJenisReksadana==undefined||this.namaJenisReksadana==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
    else{
      this.plannerService.getListReksadana(this.idJenis).subscribe((response:ResponseApi)=>{
        
        this.listReksadana=response.output_schema;
        console.log(this.listReksadana);
        this.loader=false;
      },error=>{
        if(error.status == 403){
          this.sharedService.logout()
        }else if(error.status==404){
          this.loader=false;
          this.notFound=true;
        }else
        {
          //this.isLoading=false;
          this.isFailedToLoad = true;
        }
      });
    }
  }
  
  addKonfirmasi(reksadana:PlannerReksadana):void{
    
    this.plannerService.addKonfirmasiPembelian(reksadana);
    this.router.navigate(['../beli-reksadana'],{relativeTo:this.route})
    
  }
  retryClicked(){
    this.loader=true;
    this.isFailedToLoad = false;
    this.checkState();
  }
  
}
