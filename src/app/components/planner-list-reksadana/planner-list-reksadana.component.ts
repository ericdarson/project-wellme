import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import { PlannerService } from 'src/app/services/planner.service';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerReksadana } from 'src/app/models/planner-reksadana';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';

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
  constructor(private router : Router, private location:Location,private route: ActivatedRoute,private plannerService:PlannerPembelianService) { }

  ngOnInit(): void {
    this.checkState();
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
      })
    }
  }

  addKonfirmasi(reksadana:PlannerReksadana):void{
    
    this.plannerService.addKonfirmasiPembelian(reksadana);
    this.router.navigate(['../beli-reksadana'],{relativeTo:this.route})

  }
  
}
