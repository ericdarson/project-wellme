import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerSimulasi } from 'src/app/models/planner-simulasi';
import { PlannerService } from 'src/app/services/planner.service';
import { Chart } from 'chart.js';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerUpdateRequest } from 'src/app/models/planner-update-request';
import { PlannerEditSuccessComponent } from '../planner-edit-success/planner-edit-success.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-planner-edit-confirmation',
  templateUrl: './planner-edit-confirmation.component.html',
  styleUrls: ['./planner-edit-confirmation.component.css']
})
export class PlannerEditConfirmationComponent implements OnInit {
  plannerEditRequest:PlannerUpdateRequest;
  idDetail:number;
  status:boolean=true;
  editConfirmation:string;
  loader:boolean=false;
  constructor(private dialog:MatDialog, private plannerService:PlannerService,private router:Router,private location:Location,private route:ActivatedRoute) {   
    
  }
  
  goBack()
  {
    this.location.back();
  }
  ngOnInit(): void {
    this.checkState();
  }
  
  checkState():void{
    this.plannerEditRequest=this.plannerService.getLocalStorage("plannerEdit");
    this.idDetail=this.plannerService.getLocalStorage("idDetail");
    this.editConfirmation=this.plannerService.getLocalStorage("editConfirmation");

    if(this.plannerEditRequest==null||this.idDetail==null||this.editConfirmation==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    var kategori=this.plannerEditRequest.kategori;
    if(kategori=="")
    { 
      this.router.navigate(['/financial-planner/']);
    }
  }

  doEdit():any{
    this.loader=true;
    this.plannerService.updatePlanner(this.plannerEditRequest,this.idDetail).subscribe(response=>{
      this.plannerService.clearLocalStorage("plannerEdit");
      this.plannerService.clearLocalStorage("editConfirmation");
      this.openSuccessPopup();
      this.loader=false;
    },(error:any)=>{
      this.status=false;
      console.log("err -->",error);
    });
  }
  openSuccessPopup():void{
    const dialogRef = this.dialog.open(PlannerEditSuccessComponent, {
      height:'360px',
      width: '360px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.router.navigate(['../'],{relativeTo:this.route});
    });
  }
 
}
