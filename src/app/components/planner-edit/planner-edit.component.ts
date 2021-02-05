import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerUpdateRequest } from 'src/app/models/planner-update-request';
import { PlannerService } from 'src/app/services/planner.service';
import * as moment from 'moment';
import { KonfirmasiDeleteComponent } from 'src/app/popup/konfirmasi-delete/konfirmasi-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSuccessComponent } from 'src/app/popup/delete-success/delete-success.component';
@Component({
  selector: 'app-planner-edit',
  templateUrl: './planner-edit.component.html',
  styleUrls: ['./planner-edit.component.css']
})
export class PlannerEditComponent implements OnInit {
  plannerDetail:PlannerDetail;
  canDelete:boolean=false;
  plannerUpdateRequest:PlannerUpdateRequest;
  idDetail:number;
  constructor(private dialog:MatDialog,private plannerService:PlannerService,private router:Router,private location:Location,private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.checkState();
    
  }
  checkState():void{
    this.plannerDetail=this.plannerService.getLocalStorage("plannerDetail");
    this.idDetail=this.plannerService.getLocalStorage("idDetail");
    if(this.plannerDetail==null||this.idDetail==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    else{
      if(this.plannerDetail.portfolio.length==0)
      {
        this.canDelete=true;
      }
      else{
        this.canDelete=false;
      }
      var momentvar=moment(this.plannerDetail.due_date,'DD MMM YY');
      this.plannerUpdateRequest={
        due_date:momentvar.format("DD-MM-YYYY"),
        goal_amount:Number(this.plannerDetail.target_plan),
        kategori:this.plannerDetail.category,
        nama_plan:this.plannerDetail.nama_plan,
        periodic:this.plannerDetail.periodic
      }
      
    }
    this.plannerService.setLocalStorage("plannerEdit",this.plannerUpdateRequest);
  }
  goBack()
  {
    this.location.back();
  }
  
  
  deletePlan(){
    
    const dialogRef = this.dialog.open(KonfirmasiDeleteComponent, {
      height:'350px',
      width: '350px',
      disableClose: true 
    });
    
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.plannerService.deletePlanner(this.idDetail).subscribe(response=>{
          this.plannerService.clearLocalStorage("plannerDetail");
          this.plannerService.clearLocalStorage("idDetail");
          const dialogRef2 = this.dialog.open(DeleteSuccessComponent, {
            height:'350px',
            width: '350px',
            disableClose: true 
          });
          dialogRef2.afterClosed().subscribe(result => {
            this.router.navigate(['../'],{relativeTo:this.route});
          });
        }); 
      }
    });
  }
  
}
