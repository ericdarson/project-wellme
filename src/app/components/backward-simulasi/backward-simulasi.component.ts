import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common';
@Component({
  selector: 'app-backward-simulasi',
  templateUrl: './backward-simulasi.component.html',
  styleUrls: ['./backward-simulasi.component.css']
})
export class BackwardSimulasiComponent implements OnInit {
  lamaInvestasi : number;
  hariSelected: boolean = true;
  mingguSelected: boolean = false;
  bulanSelected: boolean = false;
  
  constructor(private location: Location) { }

  ngOnInit(): void {
  }


  back(){
    this.location.back()
  }

  selectHari(){
    this.hariSelected = true
    this.bulanSelected = this.mingguSelected = false
  }
  selectMinggu(){
    this.mingguSelected  = true
    this.bulanSelected = this.hariSelected = false
  }
  selectBulan(){
    this.bulanSelected  = true
    this.hariSelected = this.mingguSelected = false
  }
}
