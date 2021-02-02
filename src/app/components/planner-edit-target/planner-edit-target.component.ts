import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerUpdateRequest } from 'src/app/models/planner-update-request';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-edit-target',
  templateUrl: './planner-edit-target.component.html',
  styleUrls: ['./planner-edit-target.component.css']
})
export class PlannerEditTargetComponent implements OnInit {
  iconColor:string[][]=[["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],]
  plannerDetail:PlannerDetail;
  kategori:string="";
  plannerEditRequest:PlannerUpdateRequest;
  idDetail:number;
  constructor(private location:Location,private plannerService:PlannerService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.checkState();
  }
  
  checkState():void{

    this.plannerEditRequest=this.plannerService.getLocalStorage("plannerEdit");
    this.idDetail=this.plannerService.getLocalStorage("idDetail");
    if(this.plannerEditRequest==null||this.idDetail==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    this.kategori=this.plannerEditRequest.kategori;
    if(this.kategori!="")
    { 
      this.kategori=="Pendidikan"?this.targetClicked(0):this.kategori=="Pernikahan"?this.targetClicked(1):this.kategori=="Gadget"?this.targetClicked(2):this.kategori=="Kendaraan"?this.targetClicked(3):this.kategori=="Rumah"?this.targetClicked(4):this.kategori=="Liburan"?this.targetClicked(5):this.kategori=="Hiburan"?this.targetClicked(6):this.kategori=="Pensiun"?this.targetClicked(7):this.targetClicked(8);
    }
  }


  targetClicked(num:number):void{
    var icon:string[][]=[];
    for (let i = 0; i < 9; i++) {
      if(i==num)
      {
        icon.push(["#6ED940","#fff"]);
      }
      else{
        icon.push(["#fff","#6ED940"]);
      }
      
      
    } 
    num==0?this.kategori="Pendidikan":num==1?this.kategori="Pernikahan":num==2?this.kategori="Gadget":num==3?this.kategori="Kendaraan":num==4?this.kategori="Rumah":num==5?this.kategori="Liburan":num==6?this.kategori="Hiburan":num==7?this.kategori="Pensiun":this.kategori="Lainnya";
    this.iconColor=icon;
    this.plannerEditRequest.kategori=this.kategori;
    this.plannerService.setLocalStorage("plannerEdit",this.plannerEditRequest);
  }


  goBack(){
    this.location.back();
  }

}
