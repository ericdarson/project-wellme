import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

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
  constructor() {   

}
ngAfterViewInit() {
  console.log("afterinit");
  setTimeout(() => {
    
  this.context = this.myCanvas.nativeElement.getContext('2d'); 
  this.ctx=this.context==null?new CanvasRenderingContext2D():this.context;
    var  chart:any;
    // this.socket.on('data1', (res:any) => {
    //   this.updateChartData(chart, res, 0);
    //   this.updateChartData(this.doughnut,res.slice(0,5), 0);
    // })
    
    // this.socket.on('data2', (res:any) => {
    //   this.updateChartData(chart, res, 1);
    // })

    chart = new Chart(this.ctx, {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Combo Bar and line Chart'
        },
      },
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            type: 'line',
            label: 'Nominal Dengan Investasi',
            data: [10, 20, 30, 40, 50, 60, 70, 80],
            backgroundColor: '#6ED940',
            borderColor: '#6ED940',
            fill: false,
          },
          // {
          //   type: 'line',
          //   label: 'Dataset 2',
          //   backgroundColor: 'rgba(0,0,255,0.4)',
          //   borderColor: 'rgba(0,0,255,0.4)',
          //   data: [
          //     443, 256, 165, 100, 56, 65, 35, 543
          //   ],
          //   fill: true,
          // },
          {
            type: 'line',
            label: 'Nominal Tanpa Investasi',
            data: [8, 18, 30, 40, 55, 65, 75, 85],
            backgroundColor: '#FF8000',
            borderColor: '#FF8000',
            fill: false,
          }
        ]
      }
    });
    
    let options = {
      // aspectRatio: 1,
      // legend: false,
      tooltips: false,
      
      elements: {
        point: {
          borderWidth: function (context:any) {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },
          hoverBackgroundColor: 'transparent',
          hoverBorderColor: function (context:any) {
            return "red";
          },
          hoverBorderWidth: function (context:any) {
            var value = context.dataset.data[context.dataIndex];
            return Math.round(8 * value.v / 1000);
          },
          radius: function (context:any) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 1000;
            return (size / 24) * base;
          }
        }
      }
    };
    

        
        this.doughnut =  new Chart('doughnut',{
          type: 'doughnut',
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Doughnut Chart'
            },legend: {
              position: 'top',
            },animation: {
              animateScale: true,
              animateRotate: true
            }
          },
          data: {
            datasets: [{
              data: [45,10,5,25,15],
              backgroundColor: ["red","orange","yellow","green","blue"],
              label: 'Dataset 1'
            }],
            labels: ['Red','Orange','Yellow','Green','Blue']
          }
        })
        
        this.pie = new Chart('pie',{
          type: 'pie',
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Pie Chart'
            },legend: {
              position: 'top',
            },animation: {
              animateScale: true,
              animateRotate: true
            }
          },
          data: {
            datasets: [{
              data: [45,10,5,25,15].reverse(),
              backgroundColor: ["red","orange","yellow","green","blue"],
              label: 'Dataset 1'
            }],
            labels: ['Red','Orange','Yellow','Green','Blue']
          }
        })


  }, 1000);
}
  ngOnInit(): void {

        
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
    }
    
    
    