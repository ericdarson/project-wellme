import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { BackwardProjectionResult, BackwardProjectionResultDetails } from '../../models/BackwardProjectionResult'
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'

@Component({
  selector: 'app-backward-result',
  templateUrl: './backward-result.component.html',
  styleUrls: ['./backward-result.component.css']
})
export class BackwardResultComponent implements OnInit {

  @ViewChild('line',{static:true})
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D|null;
  ctx:CanvasRenderingContext2D;
  oneWeekRangeSelected : boolean =true
  oneMonthRangeSelected : boolean =false 
  threeMonthRangeSelected : boolean =false
  oneYearRangeSelected : boolean =false
  reksaId :string
  simulationdate :string
  resultData:BackwardProjectionResult = new BackwardProjectionResult();
  chart:Chart;
  jenisreksa:string;
  isFailedToLoad:boolean = false;
  isLoading:boolean = true;

  constructor(private service: BackwardProjectionListReksadanaService,private location : Location, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.jenisreksa = ""+this.service.getJenisReksadana()
    console.log("Jenis Reksa : " + this.jenisreksa)
    if(this.jenisreksa == "null" || this.jenisreksa == ""){
      console.log("redirecting")
      this.router.navigate(["../../index"]);
    }

    this.route.paramMap.subscribe(params => {
      this.reksaId = params.get('id')!
      this.simulationdate = params.get('date')!
    });

    this.retryClicked();
  }

  initChart(){
    if(this.resultData != null){
      let tempData:BackwardProjectionResultDetails[] = this.resultData.cart_data_one_week;
      let listlabel:string[] = []
      let nabs:number[] = []
      tempData.forEach((obj,index) => {
        listlabel.push(obj.datestring_daily)
        nabs.push(obj.nab_daily)
      });
      this.context = this.myCanvas.nativeElement.getContext('2d'); 
      this.ctx=this.context==null?new CanvasRenderingContext2D():this.context;
      
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
            display: true,
            text: 'Combo Bar and line Chart'
          },
        },
        data: {
          labels: listlabel,
          datasets: [
            {
              type: 'line',
              label: 'Nominal Dengan Investasi',
              data: nabs,
              backgroundColor: '#6ED940',
              borderColor: '#6ED940',
              fill: false,
            },
          ]
        }
      });
    }
  }

  updateChart(){
    let tempData:BackwardProjectionResultDetails[] = []

    if(this.oneWeekRangeSelected) tempData = this.resultData.cart_data_one_week;
    else if(this.oneMonthRangeSelected) tempData = this.resultData.cart_data_one_month;
    else if(this.threeMonthRangeSelected) tempData = this.resultData.cart_data_three_months;
    else if(this.oneYearRangeSelected) tempData = this.resultData.cart_data_one_year;

    let listlabel:string[] = []
    let nabs:number[] = []
    tempData.forEach((obj,index) => {
        listlabel.push(obj.datestring_daily)
        nabs.push(obj.nab_daily)
      });
      
      this.chart.data.datasets = [
        {
          type: 'line',
          label: 'NAB',
          data: nabs,
          backgroundColor: '#6ED940',
          borderColor: '#6ED940',
          fill: false,
        },
      ]
      this.chart.data.labels = listlabel;
      this.chart.update();
  }

  back(){
    this.location.back()
  }

  selectOneWeekRange(){
    this.oneWeekRangeSelected = true
    this.oneMonthRangeSelected= this.threeMonthRangeSelected = this.oneYearRangeSelected = false
    this.updateChart();
  }
  selectOneMonthRange(){
    this.oneMonthRangeSelected  = true
    this.oneWeekRangeSelected= this.threeMonthRangeSelected = this.oneYearRangeSelected = false
    this.updateChart();
  }
  selectThreeMonthRange(){
    this.threeMonthRangeSelected  = true
    this.oneMonthRangeSelected= this.oneWeekRangeSelected = this.oneYearRangeSelected = false
    this.updateChart();
  }
  selectOneYearRange(){
    this.oneYearRangeSelected  = true
    this.oneMonthRangeSelected= this.threeMonthRangeSelected = this.oneWeekRangeSelected = false
    this.updateChart();
  }
  retryClicked(){
    this.isFailedToLoad = false;
    this.isLoading = true;
    this.service.projectionResult(this.simulationdate, this.reksaId).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.resultData = response.output_schema;
        this.initChart();

      }else if (response.error_schema.error_code=="BIT-10-001"){
        this.location.back()
      }
      this.isFailedToLoad = false;
      this.isLoading = false;
    },error=>{
      this.isFailedToLoad = true;
      this.isLoading = false;
    });
  }
}
