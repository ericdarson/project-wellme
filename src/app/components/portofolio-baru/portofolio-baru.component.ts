import { CurrencyPipe, DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';
import {NgForm} from '@angular/forms'
import * as moment from 'moment';
@Component({
  selector: 'app-portofolio-baru',
  templateUrl: './portofolio-baru.component.html',
  styleUrls: ['./portofolio-baru.component.css']
})
export class PortofolioBaruComponent implements OnInit {
  id:number|null;
  periodic:string="";
  dateMin = new Date();
  constructor(private location:Location,private plannerService:PlannerService,private currencyPipe : CurrencyPipe,private route:Router) { }
  portfolioForm:any;
  monthlyDisabled:boolean=false;
  yearlyDisabled:boolean=false;
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
    var kategori=this.plannerService.getInsertRequest().kategori;
    if(kategori=="")
    { 
      this.route.navigate(['/financial-planner/pilih-target']);
    }
  }

  isFilled():void{
    if(this.plannerService.isRequestValid())
    {
      var plannerRequest=this.plannerService.getInsertRequest();
      
      var periodic=plannerRequest.periodic=="Weekly"?"Mingguan":plannerRequest.periodic=="Monthly"?"Bulanan":"Tahunan";
      var momentvar=moment(plannerRequest.due_date,'DD-MM-YYYY');
      
      //console.log(momentvar.format('YYYY-MM-DD'));
      
      this.portfolioForm.setValue({
        nama_portfolio:plannerRequest.nama_plan,
        target:Number(plannerRequest.goal_amount),
        durasi_target:momentvar.format('YYYY-MM-DD'),
        periodic:periodic

      });
      this.formattedAmount=plannerRequest.goal_amount;
      this.periodic=periodic;
      // this.portfolioForm.cotrols['nama_portfolio'].value=plannerRequest.nama_plan;
      // this.portfolioForm.cotrols['target'].value=plannerRequest.goal_amount;
      // this.portfolioForm.cotrols['durasi_target'].value=new Date(plannerRequest.due_date).toISOString;
      // this.portfolioForm.cotrols['periodic'].value=plannerRequest.periodic;
    }
  }

  goBack(){
    this.location.back();
  }
  onSubmit(){

    if(!this.portfolioForm.invalid&&(this.periodic=="Mingguan"||this.periodic=="Bulanan"||this.periodic=="Tahunan")){

      var periodic=this.periodic=="Mingguan"?"Weekly":this.periodic=="Bulanan"?"Monthly":"Yearly";
      var date=new Date(this.portfolioForm.controls['durasi_target'].value);
      var dateString=formatDate(date,'dd-MM-yyyy','en-Us');      
      this.transformToAmount();
      this.plannerService.setRequest(this.portfolioForm.controls['nama_portfolio'].value,Number(this.portfolioForm.controls['target'].value),periodic,dateString);

      this.route.navigate(['/financial-planner/simulasi-planner']);
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
      }
      
    }
    return null
  }

  formattedAmount :string = "";
  temp :any
  transformAmount(element:any){
    
    if(this.formattedAmount.substr(-3)[0] == '.'){
      this.formattedAmount = this.formattedAmount.substr(0,this.formattedAmount.length-3);
    }
    this.formattedAmount= this.formattedAmount.replace(/[^0-9]/g, "")
    this.portfolioForm.controls['target'].value=Number(this.formattedAmount);


    this.temp = this.currencyPipe.transform(this.formattedAmount, ' ');
    if(this.temp!=null){
      this.formattedAmount =this.temp
    }
    element.target.value = this.formattedAmount;
  }

  transformToAmount():void{
    if( this.portfolioForm.controls['target'].value.substr(-3)[0] == '.'){
      this.portfolioForm.controls['target'].value =  this.portfolioForm.controls['target'].value.substr(0, this.portfolioForm.controls['target'].value.length-3);
    }
    this.portfolioForm.controls['target'].value=  this.portfolioForm.controls['target'].value.replace(/[^0-9]/g, "")
    this.portfolioForm.controls['target'].value=Number(this.portfolioForm.controls['target'].value);
  }

}
