import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';
import { CurrencyPipe, Location } from '@angular/common';
import { observable } from 'rxjs';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { GeturlService } from 'src/app/services/geturl.service';
@Component({
  selector: 'app-detail-planner',
  templateUrl: './detail-planner.component.html',
  styleUrls: ['./detail-planner.component.css']
})
export class DetailPlannerComponent implements OnInit {
  plan:PlannerDetail;
  id:any;
  imageSequence:string[]=[];
  imgSrcSequence:string[]=["","","","","","","","",""];
  loader:boolean=true;
  isFailedToLoad : boolean =false;
  errorStatus : number;
  constructor(private location: Location,private plannerService:PlannerService,
     private router:Router,private plannerPembelianService:PlannerPembelianService,
     private sharedService:GeturlService,private activeRoute : ActivatedRoute) {
     
    }
  
  ngOnInit(): void {
    // this.id=this.plannerService.getIdDetail();
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get("id")!
    });
    console.log(this.id)
    if(this.id==undefined||this.id==null)
    {
      this.router.navigate(['/financial-planner/']);
    }
    else{
      this.plannerPembelianService.setIdDetail(this.id);
    }
    this.getDetail();
  }
  
  getDetail():void{
    this.plannerService.getPlannerDetail(this.id).subscribe((response:ResponseApi)=>{
     this.loader=false;
      this.plan=response.output_schema;
      console.log(this.plan);
      this.plannerPembelianService.setLocalStorage('plannerDetail',this.plan);
      this.plannerService.setNamaPlannerDetail(this.plan.nama_plan);
      this.plannerService.setRekomendasiPembelian(this.plan.rekomendasi_pembelian);
      
      this.plannerPembelianService.setNamaPlannerDetail(this.plan.nama_plan);
      this.plannerPembelianService.setRekomendasiPembelian(this.plan.rekomendasi_pembelian);
      this.distributeImage(this.plan.gambar,this.plan.puzzle_sequence,this.plan.category,this.plan.current_amount,this.plan.target_plan);

    },(error)=>{
      this.errorStatus = error.status
    
      this.isFailedToLoad = true;
      
      console.log(error);
    }
    )
  }
  
  goBack(){
    this.location.back()
  }
  
  distributeImage(imgNum:string,seq:string,category:string,current_amount:number,target_plan:number):void{
    if(category=="Pendidikan"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"scholar1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"scholar2_",current_amount,target_plan);
      }
    }
    else if(category=="Pernikahan"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"married1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"married2_",current_amount,target_plan);
      }
    }
    else if(category=="Gadget"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"laptop_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"kamera_",current_amount,target_plan);
      }
    }
    else if(category=="Kendaraan"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"car1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"car2_",current_amount,target_plan);
      }
    }
    else if(category=="Rumah"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"rumah1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"rumah2_",current_amount,target_plan);
      }
    }
    else if(category=="Liburan"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"travel1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"travel2_",current_amount,target_plan);
      }
    }
    else if(category=="Hiburan"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"console_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"console2_",current_amount,target_plan);
      }
    }
    else if(category=="Pensiun"){
      if(imgNum=="1"){
        this.establishImgSrc(seq,"scholar1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"scholar2_",current_amount,target_plan);
      }
    }
    else {
      if(imgNum=="1"){
        this.establishImgSrc(seq,"others1_",current_amount,target_plan);
      }
      else if(imgNum="2"){
        this.establishImgSrc(seq,"others2_",current_amount,target_plan);
      }
    }
    
  }

  establishImgSrc(seq:string,imgName:string,current_amount:number,target_plan:number):void{
    this.imageSequence= seq.split("");
    var i=Math.floor((current_amount/target_plan*100>100?100:current_amount/target_plan*100)/11.111);
    var counter=0;
    this.imageSequence.forEach(element => {
      var num:number=+element;
      var filenum:number=num;
      if(counter<i){
       
        this.imgSrcSequence[num-1]="assets/img/"+imgName+filenum+".png";
      }
      else{
        this.imgSrcSequence[num-1]="assets/img/no_pic.png";
      }
      counter++;
      
    });
  }
  retryClicked(){
    this.loader=true;
    this.isFailedToLoad = false;
    this.getDetail()
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else if(this.errorStatus ==404){
      this.goBack()
    }else{
      this.retryClicked();
    }
  }
}
