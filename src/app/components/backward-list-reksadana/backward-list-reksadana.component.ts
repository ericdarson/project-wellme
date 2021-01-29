import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'
import { BackwardProjectionListProdukRekadana } from '../../models/BackwardProjectionListProdukReskadana'
import * as moment from 'moment';

@Component({
  selector: 'app-backward-list-reksadana',
  templateUrl: './backward-list-reksadana.component.html',
  styleUrls: ['./backward-list-reksadana.component.css']
})
export class BackwardListReksadanaComponent implements OnInit {
  jenisreksa:string;
  isLoading:boolean = true;
  tempVar : BackwardProjectionListProdukRekadana[] = [];
  constructor(private router : Router, private location:Location,private route: ActivatedRoute, private service: BackwardProjectionListReksadanaService) { }
  idJenis:string;
  
  ngOnInit(): void {
    this.jenisreksa = ""+this.service.getJenisReksadana()
    console.log("Jenis Reksa : " + this.jenisreksa)
    if(this.jenisreksa == "null" || this.jenisreksa == ""){
      console.log("redirecting")
      this.router.navigate(["../../index"]);
    }

    this.route.paramMap.subscribe(params => {
      this.idJenis = params.get("id")!
    });
    
    this.service.getAllProduk(this.idJenis).subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        response.output_schema.forEach((element:BackwardProjectionListProdukRekadana) => {
          this.tempVar.push(element)
        });
        this.isLoading = false;
      }
    })
  }


  goToPembelianPage(item : BackwardProjectionListProdukRekadana){
    console.log(this.router.url)
    let newDate = moment(item.max_backward_date, 'DD MMM YY')
    let tglChart = newDate.format('DD-MM-YYYY');
    this.router.navigate(['../../backward-pembelian',item.id_produk,tglChart], {relativeTo: this.route})
  }

  goBack(){
    this.router.navigate(['../../home'], {relativeTo: this.route})
  }

}
