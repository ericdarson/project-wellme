import { CurrencyPipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'
import { BackwardProjectionDetailProduk } from '../../models/BackwardProjectionDetailProduk'
import { BackwardProjetionDailyNab } from '../../models/BackwardProjectionDetailProduk'
import * as moment from 'moment';

@Component({
  selector: 'app-backward-pembelian',
  templateUrl: './backward-pembelian.component.html',
  styleUrls: ['./backward-pembelian.component.css']
})
export class BackwardPembelianComponent implements OnInit {

  @ViewChild('line',{static:true})
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D|null;
  ctx:CanvasRenderingContext2D;
  oneWeekRangeSelected : boolean =true
  oneMonthRangeSelected : boolean =false 
  threeMonthRangeSelected : boolean =false
  oneYearRangeSelected : boolean =false
  reksaId :string
  detailProduk:BackwardProjectionDetailProduk
  listlabel:string[] = []
  nabs:number[] = []
  chart:Chart;
  tglChart:string;
  
  dateMin :Date;
  dateNow :Date;
  dateSelected :Date;
  latest_date:string;
  desiredValue:number=0;
  isLoading:boolean = true;
  isFailedToLoad:boolean = false;
  isFailedToLoadDate:boolean = false;
  errorStatus : number;
  errorStatusDate : number;

  constructor(private service:BackwardProjectionListReksadanaService, private location: Location,private currencyPipe : CurrencyPipe,private router : Router,private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    let jenisreksa = ""+this.service.getJenisReksadana()
    //console.log("Jenis Reksa : " + jenisreksa)
    if(jenisreksa == "null" || jenisreksa == ""){
      //console.log("redirecting")
      this.router.navigate(["../../../home"],{relativeTo: this.route});
    }

    this.route.paramMap.subscribe(params => {
      this.reksaId = params.get('id')!
      this.tglChart = params.get('tgl-chart')!
      let newDate = moment(this.tglChart, 'DD-MM-YYYY')
      let tglChart = newDate.format('MM-DD-YYYY');
      this.dateMin = new Date(tglChart);
      this.dateSelected = new Date(tglChart);
      this.dateNow = new Date();
    });

    this.detailProduk = new BackwardProjectionDetailProduk();
    
    this.context = this.myCanvas.nativeElement.getContext('2d'); 

    this.ctx=this.context==null?new CanvasRenderingContext2D():this.context;
    this.latest_date = moment(this.dateSelected).format("DD-MM-yyyy");
    this.retryClicked();
  }

  dateChange(){
    this.latest_date = moment(this.dateSelected).format("DD-MM-yyyy");
    this.isLoading = true;
    this.redrawChartKosong();
    this.isFailedToLoadDate = false;
    this.service.getDetailProduk(this.reksaId, this.latest_date).subscribe(response=>{
      //console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.detailProduk = response.output_schema;
        this.redrawChart()
      }
      this.isLoading = false;
      this.isFailedToLoadDate = false;
    }, error=>{
      this.errorStatusDate = error.status
      this.isLoading = false;
      this.isFailedToLoadDate = true;
    })
  }
  
  redrawChartAwal(){
    if(this.detailProduk != null) {
      //console.log(this.detailProduk)
      let tempData : BackwardProjetionDailyNab[] = [];
      if(this.oneWeekRangeSelected)
        tempData = this.detailProduk.one_week_daily_nab;
      else if (this.oneMonthRangeSelected)
        tempData = this.detailProduk.one_month_daily_nab;
      else if (this.threeMonthRangeSelected)
       tempData = this.detailProduk.three_months_daily_nab;
      else if (this.oneYearRangeSelected)
       tempData = this.detailProduk.one_year_daily_nab;
      
      this.listlabel = []
      this.nabs = []
      tempData.forEach((obj,index) => {
        this.listlabel.push(obj.datestring)
        this.nabs.push(obj.nab_daily)
      });
       
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        options: {
          responsive: true,
          scales:
        {
          xAxes:[{
            ticks:{
                display: true,
                autoSkip: true,
                maxTicksLimit: 12
            }
          }]
          },
          title: {
            display: false,
            text: ''
          },
        },
        data: {

          labels: this.listlabel,
          datasets: [
            {
              type: 'line',
              label: 'NAB',
              data: this.nabs,
              backgroundColor: '#6ED940',
              borderColor: '#6ED940',
              fill: false,
            },
          ]
        }
      });
    }
  }

  redrawChartKosong(){
      this.chart.data.datasets = [
        {
          type: 'line',
          label: 'NAB',
          data: [],
          backgroundColor: '#6ED940',
          borderColor: '#6ED940',
          fill: false,
        },
      ]
      this.chart.data.labels = [];
      this.chart.update();
  }

  redrawChart(){
    if(this.detailProduk != null) {
      //console.log(this.detailProduk)
      let tempData : BackwardProjetionDailyNab[] = [];
      if(this.oneWeekRangeSelected)
        tempData = this.detailProduk.one_week_daily_nab;
      else if (this.oneMonthRangeSelected)
        tempData = this.detailProduk.one_month_daily_nab;
      else if (this.threeMonthRangeSelected)
       tempData = this.detailProduk.three_months_daily_nab;
      else if (this.oneYearRangeSelected)
       tempData = this.detailProduk.one_year_daily_nab;

      this.listlabel = []
      this.nabs = []
      tempData.forEach((obj,index) => {
        this.listlabel.push(obj.datestring)
        this.nabs.push(obj.nab_daily)
      });

      this.chart.data.datasets = [
        {
          type: 'line',
          label: 'NAB',
          data: this.nabs,
          backgroundColor: '#6ED940',
          borderColor: '#6ED940',
          fill: false,
        },
      ]
      this.chart.data.labels = this.listlabel;
      this.chart.update();
    }
  }

  back(){
    this.location.back()
  }

  selectOneWeekRange(){
    this.oneWeekRangeSelected = true
    this.oneMonthRangeSelected= this.threeMonthRangeSelected = this.oneYearRangeSelected = false
    this.redrawChart()
  }
  selectOneMonthRange(){
    this.oneMonthRangeSelected  = true
    this.oneWeekRangeSelected= this.threeMonthRangeSelected = this.oneYearRangeSelected = false
    this.redrawChart()
  }
  selectThreeMonthRange(){
    this.threeMonthRangeSelected  = true
    this.oneMonthRangeSelected= this.oneWeekRangeSelected = this.oneYearRangeSelected = false
    this.redrawChart()
  }
  selectOneYearRange(){
    this.oneYearRangeSelected  = true
    this.oneMonthRangeSelected= this.threeMonthRangeSelected = this.oneWeekRangeSelected = false
    this.redrawChart()
  }

  formattedAmount :string = "";
  temp :any
  transformAmount(element:any){
    if(this.formattedAmount.substr(-3)[0] == '.'){
      this.formattedAmount = this.formattedAmount.substr(0,this.formattedAmount.length-3);
    }
    this.formattedAmount= this.formattedAmount.replace(/[^0-9]/g, "")
    this.desiredValue= +this.formattedAmount;

    //console.log(this.formattedAmount)
    this.temp = this.currencyPipe.transform(this.formattedAmount, ' ');
    if(this.temp!=null){
      this.formattedAmount =this.temp
    }
    element.target.value = this.formattedAmount;
  }

  checkDisable(){
    return this.desiredValue >= +this.detailProduk.minimal_pembelian;
  }

  goToSimulasiPage(){
    this.service.setNabSimulation(null);
    ////console.log(this.service.getNabSimulation())
    this.service.setNominal(this.desiredValue);
    this.service.setNamaProduk(this.detailProduk.nama_produk);
    this.router.navigate(['../../../backward-simulasi/'+this.reksaId+"/"+this.latest_date],{relativeTo:this.route})
  }

  retryClicked(){
    this.isLoading = true;
    this.isFailedToLoad = false;
    this.service.getDetailProduk(this.reksaId, this.latest_date).subscribe(response=>{
      //console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.detailProduk = response.output_schema;
        this.redrawChartAwal()
      }

      this.isLoading = false;
      this.isFailedToLoad = false;
    }, error=>{
      this.isLoading = false;
      this.isFailedToLoad = true;
      this.errorStatus = error.status
      //console.log("INFO");
      //console.log(this.isLoading);
      //console.log(this.isFailedToLoad);
    })
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.retryClicked();
    }
  }

  errorButtonDateClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.dateChange();
    }
  }
}
