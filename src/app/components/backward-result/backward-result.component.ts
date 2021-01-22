import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common';
import { Chart } from 'chart.js';

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

  constructor(private location : Location) { }

  ngOnInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d'); 
    this.ctx=this.context==null?new CanvasRenderingContext2D():this.context;
    var  chart:any;
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
        ]
      }
    });
  }

  back(){
    this.location.back()
  }

  selectOneWeekRange(){
    this.oneWeekRangeSelected = true
    this.oneMonthRangeSelected= this.threeMonthRangeSelected = this.oneYearRangeSelected = false
  }
  selectOneMonthRange(){
    this.oneMonthRangeSelected  = true
    this.oneWeekRangeSelected= this.threeMonthRangeSelected = this.oneYearRangeSelected = false
  }
  selectThreeMonthRange(){
    this.threeMonthRangeSelected  = true
    this.oneMonthRangeSelected= this.oneWeekRangeSelected = this.oneYearRangeSelected = false
  }
  selectOneYearRange(){
    this.oneYearRangeSelected  = true
    this.oneMonthRangeSelected= this.threeMonthRangeSelected = this.oneWeekRangeSelected = false
  }
}
