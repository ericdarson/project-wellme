import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerBeliState } from 'src/app/models/planner-beli-state';
import { PlannerResiko } from 'src/app/models/planner-resiko';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-beli-reksadana',
  templateUrl: './beli-reksadana.component.html',
  styleUrls: ['./beli-reksadana.component.css']
})
export class BeliReksadanaComponent implements OnInit {
  plannerId:number|null;
  plannerResiko:PlannerResiko;
  tipe_resiko:string="";
  namaPlan:string|null;
  plannerBeliState:PlannerBeliState={
    pembelian:[{
      id_jenis_reksadana:0,nama_plan:""
    }]
  };
  rekomendasiPembelian:number|null;
  errorMessagePercentage:string="";
  errorMessageNominalPembelian:string="";
  errorMessageKodePromo:string="";
  errorClassPercentage:string="hidden";
  errorClassNominalPembelian:string="hidden";
  errorClassKodePromo:string="hidden";
  constructor(private router:Router,private plannerService:PlannerService,private location:Location,private route : ActivatedRoute) {}
  
  ngOnInit(): void {
    this.checkState();
    
  }
  
  getProfileResiko():void{
    this.plannerService.getPorfileResiko().subscribe(response=>{
      
      this.plannerResiko=response.output_schema;
      
      this.plannerBeliState.pembelian=response.output_schema.detail_resiko;
      this.syncBeliState();
      
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
    this.plannerBeliState.pembelian[num].percentage=Number(this.plannerBeliState.pembelian[num].percentage)+5>=100?100:Number(this.plannerBeliState.pembelian[num].percentage)+5;
  }
  decreasePercentage(num:number):void{
    this.plannerBeliState.pembelian[num].percentage=Number(this.plannerBeliState.pembelian[num].percentage)-5<0?0:Number(this.plannerBeliState.pembelian[num].percentage)-5;
  }
  
  goBack():void{
    this.location.back();
  }
  goToListReksadana(detail:any):void{
    this.plannerService.setPlannerBeliState(this.plannerBeliState);
    this.plannerService.setIdJenisReksadana(detail.id_jenis_reksadana);
    this.plannerService.setJenisReksadanaPembelian(detail.nama_plan);
    this.router.navigate(['../list-reksadana'] ,{relativeTo: this.route});
  }
  
  syncBeliState():void{
    
    var p=this.plannerService.getPlannerBeliState();
    if(p!=null)
    {
      this.plannerBeliState=p;
    }
    this.plannerBeliState.pembelian.forEach((element,key) => {
      var reksadana=this.plannerService.getKonfirmasiByIdJenis(element.id_jenis_reksadana);
      if(reksadana!=null){
        this.plannerBeliState.pembelian[key].id_produk=reksadana.id_produk;
        this.plannerBeliState.pembelian[key].nama_produk=reksadana.nama_produk;
        this.plannerBeliState.pembelian[key].minimum_pembelian=reksadana.minimum_amount;
      }
    });
  }
//TODO: Validate Form and Confirmation
  goToConfirmationPage()
  {

  }

  isRequestPembelianValid(){
    
  }
}
