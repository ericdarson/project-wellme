import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { PlannerSimulasi } from 'src/app/models/planner-simulasi';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-simulasi-planner',
  templateUrl: './simulasi-planner.component.html',
  styleUrls: ['./simulasi-planner.component.css']
})
export class SimulasiPlannerComponent implements OnInit,AfterViewInit  {
  title:string= 'dashboard';
  
  chart2:any = [];
  pie: any;
  doughnut: any;
  data1:any = [];
  socket:any
  @ViewChild('line',{static:true})
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D|null;
  ctx:CanvasRenderingContext2D;
  plannerRequest:any;
  simulasiPlanner:PlannerSimulasi
  simulationChart:any={
    labels:[],
    nominalTanpaInvestasi:[],
    nominalInvestasi:[],
  };
  nominalYangHarusDitabung:number=0;
  loader:boolean=true;
  constructor(private plannerService:PlannerService,private route:Router,private location:Location) {   
    
  }
  ngAfterViewInit() {
    
    this.getChartDetail();
    
    // this.socket.on('data1', (res:any) => {
    //   this.updateChartData(chart, res, 0);
    //   this.updateChartData(this.doughnut,res.slice(0,5), 0);
    // })
    
    // this.socket.on('data2', (res:any) => {
    //   this.updateChartData(chart, res, 1);
    // })
    

    
    // let options = {
    //   // aspectRatio: 1,
    //   // legend: false,
    //   tooltips: false,
      
    //   elements: {
    //     point: {
    //       borderWidth: function (context:any) {
    //         return Math.min(Math.max(1, context.datasetIndex + 1), 8);
    //       },
    //       hoverBackgroundColor: 'transparent',
    //       hoverBorderColor: function (context:any) {
    //         return "red";
    //       },
    //       hoverBorderWidth: function (context:any) {
    //         var value = context.dataset.data[context.dataIndex];
    //         return Math.round(8 * value.v / 1000);
    //       },
    //       radius: function (context:any) {
    //         var value = context.dataset.data[context.dataIndex];
    //         var size = context.chart.width;
    //         var base = Math.abs(value.v) / 1000;
    //         return (size / 24) * base;
    //       }
    //     }
    //   }
    // };
    
    
    
    // this.doughnut =  new Chart('doughnut',{
    //   type: 'doughnut',
    //   options: {
    //     responsive: true,
    //     title: {
    //       display: true,
    //       text: 'Doughnut Chart'
    //     },legend: {
    //       position: 'top',
    //     },animation: {
    //       animateScale: true,
    //       animateRotate: true
    //     }
    //   },
    //   data: {
    //     datasets: [{
    //       data: [45,10,5,25,15],
    //       backgroundColor: ["red","orange","yellow","green","blue"],
    //       label: 'Dataset 1'
    //     }],
    //     labels: ['Red','Orange','Yellow','Green','Blue']
    //   }
    // })
    
    // this.pie = new Chart('pie',{
    //   type: 'pie',
    //   options: {
    //     responsive: true,
    //     title: {
    //       display: true,
    //       text: 'Pie Chart'
    //     },legend: {
    //       position: 'top',
    //     },animation: {
    //       animateScale: true,
    //       animateRotate: true
    //     }
    //   },
    //   data: {
    //     datasets: [{
    //       data: [45,10,5,25,15].reverse(),
    //       backgroundColor: ["red","orange","yellow","green","blue"],
    //       label: 'Dataset 1'
    //     }],
    //     labels: ['Red','Orange','Yellow','Green','Blue']
    //   }
    // })
    
    
  }
  
  goBack()
  {
    this.location.back();
  }
  ngOnInit(): void {
    this.checkState();
  }
  
  checkState():void{
    if(this.plannerService.isRequestValid())
    {
      this.plannerRequest=this.plannerService.getInsertRequest();
    }
    else{
      this.route.navigate(['/financial-planner/pilih-target']);
    }
  }
  addData(chart:any, label:any, data:any) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset:any) => {
      dataset.data.push(data);
    });
    chart.update();
  }
  
  removeData(chart:any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset:any) => {
      dataset.data.pop();
    });
    chart.update();
  }
  
  updateChartData(chart:any, data:any, dataSetIndex:any){
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }
  
  getChartDetail():void{
    this.nominalYangHarusDitabung=0;
    this.simulationChart={
      labels:[],
      nominalTanpaInvestasi:[],
      nominalInvestasi:[],
    };
    this.plannerService.getSimulasiPlanner().subscribe((response:ResponseApi)=>{
      this.loader=false;
      this.simulasiPlanner=response.output_schema;
      this.nominalYangHarusDitabung=this.simulasiPlanner.nominal_per_periode;
      var detail_chart=this.simulasiPlanner.detail_chart;
      detail_chart.forEach((element:any) => {
         this.simulationChart.labels.push(element.date);
         this.simulationChart.nominalTanpaInvestasi.push(element.nominal_tanpa_investasi);
         this.simulationChart.nominalInvestasi.push(element.nominal_investasi);
      });
      
    this.context = this.myCanvas.nativeElement.getContext('2d'); 
    this.ctx=this.context==null?new CanvasRenderingContext2D():this.context;
    var  chart:any;
    chart = new Chart(this.ctx, {
      type: 'bar',
      options: {
        
        responsive: true,
        title: {
          display: true,
          text: 'Simulasi Investasi'
        },
        scales:
        {
          xAxes:[{
            ticks:{
                display: true,
                autoSkip: true,
                maxTicksLimit: 12
            }
        }]
        }
      },

      data: {
        
        labels: this.simulationChart.labels,
        datasets: [
          {
            type: 'line',
            label: 'Nominal Dengan Investasi',
            data: this.simulationChart.nominalInvestasi,
            backgroundColor: '#FF8000',
            borderColor: '#FF8000',
            fill: false,
          },
          {
            type: 'line',
            label: 'Nominal Tanpa Investasi',
            data: this.simulationChart.nominalTanpaInvestasi,
            backgroundColor: '#6ED940',
            borderColor: '#6ED940',
            fill: false,
          }
        ]
      }
    });
    },
    (error)=>{
      console.log(error);
    })
  }
  
  
}


