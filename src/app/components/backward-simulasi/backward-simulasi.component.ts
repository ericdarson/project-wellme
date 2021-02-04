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
  isLoading = true;
  namaProduk: string="";
  lamaInvestasi : number=0;
  hariSelected: boolean = true;
  mingguSelected: boolean = false;
  bulanSelected: boolean = false;
  isFailedToLoad: boolean = false;
  errorStatus : number;
  isFailedToLoadSimulation: boolean = false;
  errorStatusSimulation : number;

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
    let jenisreksa = ""+this.service.getJenisReksadana()
    console.log("Jenis Reksa : " + jenisreksa)
    if(jenisreksa == "null" || jenisreksa == ""){
      console.log("redirecting")
      this.router.navigate(["../../index"]);
    }
    this.namaProduk = this.service.getNamaProduk();
    if(this.namaProduk == ""){
      this.router.navigate(["../../index"]);
    }
    
    this.route.paramMap.subscribe(params => {
      this.idproduk = params.get('id')!
      this.simulationdate = params.get('date')!
    });

    this.retryClicked();
  }
  doSimulation(){
    
    let newDate = moment(this.simulationDateRequest, 'DD-MM-YYYY')
    let formattedDate = newDate.format('MM-DD-YYYY');
    let olddate = new Date(formattedDate);
    let date = new Date(formattedDate);
    if (this.hariSelected)
      date.setDate(date.getDate() + this.lamaInvestasi);
    else if (this.bulanSelected)
      date.setMonth(date.getMonth() + this.lamaInvestasi);
    else
      date.setDate(date.getDate() + 7*this.lamaInvestasi);

    this.durasiinvestasi += (date.getTime() - olddate.getTime())  / 1000 / 60 / 60 / 24;
    this.lamaInvestasi = 0;
    console.log(date)
    let datestring = moment(date).format("DD-MM-yyyy");
    let datestringtampil = moment(date).format("DD MMM YY");
    this.isLoading = true;
    this.isFailedToLoadSimulation = false;
    this.service.forwardSimulation(datestring, this.idproduk).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.simulationForwardData = response.output_schema;
        this.nabaftersimulasi = this.simulationForwardData.nab_simulation;
        this.simulationDateAfter = datestringtampil;
        this.simulationDateRequest = datestring;
        console.log(this.nominalPembelian)
      }
      this.isLoading = false;
      this.isFailedToLoadSimulation = false;
    }, error=>{
      this.errorStatusSimulation = error.status
      this.isLoading = false;
      this.isFailedToLoadSimulation = true;
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
    this.service.setDateSimulation(this.simulationDateRequest);
    this.service.setNabSimulation(this.nabaftersimulasi);
    this.service.setDateSimulationString(this.simulationDateAfter);
    this.router.navigate(['../../../backward-result/'+this.idproduk+'/'+this.simulationDateRequest],{relativeTo:this.route})
  }
  selesai(){
    this.service.setDateSimulation(null);
    this.service.setNabSimulation(null);
    this.service.setDateSimulationString(null);
    this.service.setJenisReksadana("");
    this.service.setNamaProduk("");
    console.log("redirecting")
      this.router.navigate(["../backward-projection",{relativeTo:this.route}]);
  }
  retryClicked(){
    this.service.startSimulation(this.simulationdate, this.idproduk).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        this.simulationStartData = response.output_schema;
        this.nominalPembelian = +this.service.getNominal();
        let temp = this.service.getNabSimulation();
        if(temp+"" != "null"){
    
          this.nabaftersimulasi = +this.service.getNabSimulation();
          this.simulationDateAfter = this.service.getDateSimulationString();
          this.simulationDateRequest = this.service.getDateSimulation();

          let newDate = moment(this.simulationDateRequest, 'DD-MM-YYYY')
          let formattedDate = newDate.format('MM-DD-YYYY');

          let date = new Date(formattedDate);

          let newstartDate = moment(this.simulationdate, 'DD-MM-YYYY')
          let formattedStartDate = newstartDate.format('MM-DD-YYYY');

          let startDate = new Date(formattedStartDate);

          this.durasiinvestasi  = (date.getTime() - startDate.getTime())  / 1000 / 60 / 60 / 24;
        }else{

          this.nabaftersimulasi = this.simulationStartData.starting_nab;
          this.simulationDateAfter = this.simulationStartData.start_datestring;
          this.simulationDateRequest = this.simulationStartData.start_date;
          this.durasiinvestasi =0
        }

        console.log(this.nominalPembelian)
      }else if (response.error_schema.error_code=="BIT-10-001"){
        this.location.back()
      }
      this.isLoading = false;
      this.isFailedToLoad = false;
    }, error=>{
      this.errorStatus = error.status
      this.isLoading = false;
      this.isFailedToLoad = true;
    });
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.retryClicked();
    }
  }

  errorButtonSimulationClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.doSimulation();
    }
  }

}
