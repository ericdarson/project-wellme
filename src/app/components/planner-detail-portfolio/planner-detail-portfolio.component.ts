import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerPortfolio } from 'src/app/models/planner-portfolio';
import { PlannerResiko } from 'src/app/models/planner-resiko';
import { GeturlService } from 'src/app/services/geturl.service';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-detail-portfolio',
  templateUrl: './planner-detail-portfolio.component.html',
  styleUrls: ['./planner-detail-portfolio.component.css']
})
export class PlannerDetailPortfolioComponent implements OnInit {
  plannerId:number|null;
  constructor(private router:Router,private plannerService:PlannerPembelianService,private location:Location,private sharedService:GeturlService) {}
  plan:PlannerDetail;
  portfolio:PlannerPortfolio[][]=[];
  jenisReksadana:string[]=[];
  alokasiRekomendasi:AlokasiRekomendasi[]=[];
  plannerResiko:PlannerResiko;
  loader:boolean=true;
  isFailedToLoad:boolean=false;
  errorStatus : number;
  ngOnInit(): void {
    this.checkState();
    this.prepareDetail();
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
  
  
  searchJenisReksadana(jenis:string):any{
    for (let i = 0; i < this.jenisReksadana.length; i++) {
      if(this.jenisReksadana[i]==jenis)
      {
        return i;
      }
      
    }
    return null;
  }
  
  
  prepareDetail():void{
    this.plannerService.getPorfileResiko().subscribe(response=>{
      this.loader=false;
      for (let i = 0; i < this.plan.portfolio.length; i++) {
        var index=this.searchJenisReksadana(this.plan.portfolio[i].nama_jenis);
        if(index!=null){
          if(this.portfolio[index]==undefined){
            this.portfolio[index]=[this.plan.portfolio[i]];
          }else{
            this.portfolio[index].push(this.plan.portfolio[i]);
          }
        }
        else{
          this.jenisReksadana.push(this.plan.portfolio[i].nama_jenis);
          index=this.searchJenisReksadana(this.plan.portfolio[i].nama_jenis);
          if(this.portfolio[index]==undefined){
            this.portfolio[index]=[this.plan.portfolio[i]];
          }else{
            this.portfolio[index].push(this.plan.portfolio[i]);
          }
        }
      }
      
      
      this.plannerResiko=response.output_schema;
      console.log(this.plannerResiko);
      for (let i = 0; i < this.jenisReksadana.length; i++) {
        var totalAlokasi:number=0;
        var percentageAlokasi;
        for (let j = 0; j < this.portfolio[i].length; j++) {
          totalAlokasi=Number(totalAlokasi)+Number(this.portfolio[i][j].asset);
        }
        percentageAlokasi=(totalAlokasi/this.plan.target_plan)*100;
        var percentageRekomendasi:number=this.percentageResiko(this.jenisReksadana[i]);
        var alokasiRekomendasi:number=(percentageRekomendasi/100)*this.plan.target_plan;
        this.alokasiRekomendasi.push({
          alokasiAmount:totalAlokasi,
          alokasiPercentage:percentageAlokasi,
          rekomendasiAmount:alokasiRekomendasi,
          rekomendasiPercentage:percentageRekomendasi
        })
      }
    },error=>{
      this.errorStatus = error.status
      
      this.isFailedToLoad = true;
      
    });
    
  }
  
  percentageResiko(jenis:string):number{
    for (let i = 0; i < this.plannerResiko.detail_resiko.length; i++) {
      if(this.plannerResiko.detail_resiko[i].nama_plan==jenis)
      {
        return this.plannerResiko.detail_resiko[i].percentage
      }
    }
    return 0
  };
  retryClicked(){
    this.loader=true;
    this.isFailedToLoad = false;
    this.prepareDetail();
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.retryClicked();
    }
  }
  
}

export class AlokasiRekomendasi{
  alokasiPercentage:number;
  alokasiAmount:number;
  rekomendasiPercentage:number;
  rekomendasiAmount:number;
}
