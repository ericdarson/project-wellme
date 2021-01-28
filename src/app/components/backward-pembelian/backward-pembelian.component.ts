import { CurrencyPipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'
import { BackwardProjectionDetailProduk } from '../../models/BackwardProjectionDetailProduk'
import { BackwardProjetionDailyNab } from '../../models/BackwardProjectionDetailProduk'

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
  
  dateNow :Date;
  constructor(private service:BackwardProjectionListReksadanaService, private location: Location,private currencyPipe : CurrencyPipe,private router : Router,private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.reksaId = params.get('id')!
    });
  }

  ngOnInit(): void {
    this.dateNow = new Date();
    this.context = this.myCanvas.nativeElement.getContext('2d'); 

    this.ctx=this.context==null?new CanvasRenderingContext2D():this.context;
    
    this.service.getDetailProduk(this.reksaId).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.detailProduk = response.output_schema;
        this.redrawChartAwal()
      }
    })
  }

  redrawChartAwal(){
    if(this.detailProduk != null) {
      console.log(this.detailProduk)
      let tempData : BackwardProjetionDailyNab[] = [];
      if(this.oneWeekRangeSelected)
        tempData = this.detailProduk.one_week_daily_nab;
      else if (this.oneMonthRangeSelected)
        tempData = this.detailProduk.one_month_daily_nab;
      else if (this.threeMonthRangeSelected)
       tempData = this.detailProduk.three_months_daily_nab;
      else if (this.oneYearRangeSelected)
       tempData = this.detailProduk.one_year_daily_nab;
      
      let totaldata:number = tempData.length
      let kelipatan:number = Math.round(totaldata/12)
      if (kelipatan<1) kelipatan = 1 ;
      this.listlabel = []
      this.nabs = []
      tempData.forEach((obj,index) => {
        //if((index+1)%kelipatan==0){
          this.listlabel.push(obj.datestring)
        //}
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

  redrawChart(){
    if(this.detailProduk != null) {
      console.log(this.detailProduk)
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

  formattedAmount :string;
  temp :any
  transformAmount(element:any){
    this.formattedAmount= this.formattedAmount.replace(/[^0-9]/g, "")
    console.log(this.formattedAmount)
    this.temp = this.currencyPipe.transform(this.formattedAmount, ' ');
    if(this.temp!=null){
      this.formattedAmount =this.temp
    }
    element.target.value = this.formattedAmount;
  }

  goToSimulasiPage(idReksadana : string){
    this.router.navigate(['../../backward-simulasi',idReksadana],{relativeTo:this.route})
  }


}
