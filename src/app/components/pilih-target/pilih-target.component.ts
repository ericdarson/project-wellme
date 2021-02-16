import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-pilih-target',
  templateUrl: './pilih-target.component.html',
  styleUrls: ['./pilih-target.component.css']
})
export class PilihTargetComponent implements OnInit {
  iconColor:string[][]=[["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],["#fff","#6ED940"],]
  constructor(private location:Location,private plannerService:PlannerService,private router:Router,private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.checkState();
  }
  
  checkState():void{
    var kategori=this.plannerService.getInsertRequest().kategori;
    if(kategori!="")
    { 
      kategori=="Pendidikan"?this.targetClicked(0):kategori=="Pernikahan"?this.targetClicked(1):kategori=="Gadget"?this.targetClicked(2):kategori=="Kendaraan"?this.targetClicked(3):kategori=="Rumah"?this.targetClicked(4):kategori=="Liburan"?this.targetClicked(5):kategori=="Hiburan"?this.targetClicked(6):kategori=="Pensiun"?this.targetClicked(7):this.targetClicked(8);
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
    num==0?this.plannerService.setKategori("Pendidikan"):num==1?this.plannerService.setKategori("Pernikahan"):num==2?this.plannerService.setKategori("Gadget"):num==3?this.plannerService.setKategori("Kendaraan"):num==4?this.plannerService.setKategori("Rumah"):num==5?this.plannerService.setKategori("Liburan"):num==6?this.plannerService.setKategori("Hiburan"):num==7?this.plannerService.setKategori("Pensiun"):this.plannerService.setKategori("Lainnya");
    this.iconColor=icon;
    
  }


  goBack(){
    this.router.navigate(['../planner-list'],{relativeTo:this.route});
  }
}
