import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'
import { BackwardProjectionSimulationStart } from '../../models/BackwardProjectionSimulationStart'
import { BackwardProjectionSimulationForward } from '../../models/BackwardProjectionSimulationStart'
import * as moment from 'moment';

@Component({
  selector: 'app-backward-simulasi',
  templateUrl: './backward-simulasi.component.html',
  styleUrls: ['./backward-simulasi.component.css']
})
export class BackwardSimulasiComponent implements OnInit {
  lamaInvestasi : number=0;
  hariSelected: boolean = true;
  mingguSelected: boolean = false;
  bulanSelected: boolean = false;

  nominalPembelian: number = 0;
  
  durasiinvestasi: number = 0;

  idproduk:string;

  simulationdate:string;
  simulationDateAfter:string;
  simulationDateRequest:string;
  simulationStartData:BackwardProjectionSimulationStart = new BackwardProjectionSimulationStart();
  nabaftersimulasi:number;
  
  simulationForwardData:BackwardProjectionSimulationForward;

  constructor(private service: BackwardProjectionListReksadanaService, private location: Location,private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idproduk = params.get('id')!
      this.simulationdate = params.get('date')!
    });

    this.service.startSimulation(this.simulationdate, this.idproduk).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.simulationStartData = response.output_schema;
        this.nominalPembelian = +this.service.getNominal();
        this.nabaftersimulasi = this.simulationStartData.starting_nab;
        this.simulationDateAfter = this.simulationStartData.start_datestring;
        this.simulationDateRequest = this.simulationStartData.start_date;
        console.log(this.nominalPembelian)
      }else if (response.error_schema.error_code=="BIT-10-001"){
        this.location.back()
      }
    });
  }
  doSimulation(){
    this.durasiinvestasi += this.lamaInvestasi;
    
    let newDate = moment(this.simulationDateRequest, 'DD-MM-YYYY')
    let formattedDate = newDate.format('MM-DD-YYYY');

    let date = new Date(formattedDate);
    if (this.hariSelected)
      date.setDate(date.getDate() + this.lamaInvestasi);
    else if (this.bulanSelected)
      date.setMonth(date.getMonth() + this.lamaInvestasi);
    else
      date.setMonth(date.getMonth() + 12*this.lamaInvestasi);
    
      this.lamaInvestasi = 0;
    console.log(date)
    let datestring = moment(date).format("DD-MM-yyyy");
    let datestringtampil = moment(date).format("DD MMM YY");
    this.service.forwardSimulation(datestring, this.idproduk).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.simulationForwardData = response.output_schema;
        this.nabaftersimulasi = this.simulationForwardData.nab_simulation;
        this.simulationDateAfter = datestringtampil;
        this.simulationDateRequest = datestring;
        console.log(this.nominalPembelian)
      }else if (response.error_schema.error_code=="BIT-10-001"){
        this.location.back()
      }
    });
  }

  checkDisable(){
    return this.lamaInvestasi <= 0;
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

  goToBackwardResult(){
    this.router.navigate(['../../../backward-result/'+this.idproduk+'/'+this.simulationDateRequest],{relativeTo:this.route})
  }
  selesai(){
    this.router.navigate([''])
  }
}
