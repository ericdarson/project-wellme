import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';
import {NgForm} from '@angular/forms'
import * as moment from 'moment';
import { PlannerDetail } from 'src/app/models/planner-detail';
import { PlannerUpdateRequest } from 'src/app/models/planner-update-request';
import { MatDialog } from '@angular/material/dialog';
import { PlannerEditSuccessComponent } from '../planner-edit-success/planner-edit-success.component';
@Component({
  selector: 'app-planner-edit-data-planner',
  templateUrl: './planner-edit-data-planner.component.html',
  styleUrls: ['./planner-edit-data-planner.component.css']
})
export class PlannerEditDataPlannerComponent implements OnInit {
  id:number|null;
  periodic:string="";
  dateMin = new Date();
  plannerDetail:PlannerDetail;
  plannerEditRequest:PlannerUpdateRequest;
  portfolioForm:any;
  monthlyDisabled:boolean=false;
  yearlyDisabled:boolean=false;
  idDetail:number;
  status:boolean=true;
  masterPeriodic:string;
  
  constructor(private dialog:MatDialog,private location:Location,private plannerService:PlannerService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.checkState();
    this.portfolioForm = new FormGroup({
      nama_portfolio: new FormControl('', [Validators.required]),
      target: new FormControl('',[Validators.required,Validators.min(0)]),
      durasi_target: new FormControl('',[Validators.required,this.dateValidator.bind(this)]),
      periodic: new FormControl('',Validators.required)
    });
    this.isFilled();
    
  }


  checkState():void{
    this.plannerEditRequest=this.plannerService.getLocalStorage("plannerEdit");
    this.idDetail=this.plannerService.getLocalStorage("idDetail");
    if(this.plannerEditRequest==null||this.idDetail==null)
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }
    var kategori=this.plannerEditRequest.kategori;
    if(kategori=="")
    { 
      this.router.navigate(['/financial-planner/']);
    }
  }

  isFilled():void{
      var periodic=this.plannerEditRequest.periodic=="Weekly"?"Mingguan":this.plannerEditRequest.periodic=="Monthly"?"Bulanan":"Tahunan";
      var momentvar=moment(this.plannerEditRequest.due_date,'DD-MM-YYYY');
      console.log("Edit Due Date: ",this.plannerEditRequest.due_date);
      console.log(momentvar.format('YYYY-MM-DD'));
      this.portfolioForm.setValue({
        nama_portfolio:this.plannerEditRequest.nama_plan,
        target:this.plannerEditRequest.goal_amount,
        durasi_target:momentvar.format('YYYY-MM-DD'),
        periodic:periodic

      });
      this.periodic=periodic;
      this.masterPeriodic=periodic;
      this.portfolioForm.controls['periodic'].value=this.masterPeriodic;
   
  }

  goBack(){
    this.location.back();
  }
  onSubmit(){
    if(!this.portfolioForm.invalid&&(this.periodic=="Mingguan"||this.periodic=="Bulanan"||this.periodic=="Tahunan")){
      var periodic=this.periodic=="Mingguan"?"Weekly":this.periodic=="Bulanan"?"Monthly":"Yearly";
      var date=new Date(this.portfolioForm.controls['durasi_target'].value);
      var dateString=formatDate(date,'dd-MM-yyyy','en-Us');      
      this.plannerEditRequest.nama_plan=this.portfolioForm.controls['nama_portfolio'].value;
      this.plannerEditRequest.goal_amount=Number(this.portfolioForm.controls['target'].value);
      this.plannerEditRequest.periodic=periodic;
      this.plannerEditRequest.due_date=dateString;
      this.plannerService.updatePlanner(this.plannerEditRequest,this.idDetail).subscribe(response=>{
        this.plannerService.clearLocalStorage("plannerEdit");
        this.openSuccessPopup();
      },(error:any)=>{
        this.status=false;
        console.log("err -->",error);
      });
    }
  }

  dateValidator(control: FormControl): { [s: string]: boolean }|null{
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      var durasiHari=date.diff(today,'days');
      var durasiBulan=date.diff(today,'months');
      if (date.isBefore(today)||durasiHari<14) {
        return { 'invalidDate': true }
      }
      else{
        if(durasiBulan<3){
          this.portfolioForm.controls['periodic'].value="Mingguan";
          this.periodic="Mingguan";
          this.monthlyDisabled=true;
          this.yearlyDisabled=true;
        }else if(durasiBulan>=3){
          this.portfolioForm.controls['periodic'].value="Bulanan";
          this.periodic="Bulanan";
          this.monthlyDisabled=false;
          this.yearlyDisabled=true;
        }
        if(durasiBulan>=24)
        {

          this.portfolioForm.controls['periodic'].value="Bulanan";
          this.periodic="Bulanan";
          this.monthlyDisabled=false;
          this.yearlyDisabled=false;          
        }
        if(this.masterPeriodic!="")
        {
          this.portfolioForm.controls['periodic'].value=this.masterPeriodic;
          this.periodic=this.masterPeriodic;
          this.masterPeriodic="";

        }

        
      }
      
    }
    return null
  }
  
  openSuccessPopup():void{
    const dialogRef = this.dialog.open(PlannerEditSuccessComponent, {
      height:'500px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.router.navigate(['../'],{relativeTo:this.route});
    });
  }
}
