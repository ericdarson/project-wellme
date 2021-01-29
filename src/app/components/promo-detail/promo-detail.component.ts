import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { Objectives } from '../../models/Promotion';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.css']
})
export class PromoDetailComponent implements OnInit {
  promoStatus=""
  promoId:string=""
  objective : Objectives;
  isNotFound : boolean = false;
  isLoading : boolean = false;
  isComplete : boolean =false;
  isProgress : boolean = false;
  isNotStart : boolean= false;
  currentProgress : number;

  constructor(private route : ActivatedRoute ,private router :Router,private promoService : PromoService) { 
    
  }

  ngOnInit(): void {
    this.detectChange()
  }

  backClicked(){
    this.router.navigate(['../list'], {relativeTo: this.route})
  }

  claimPrize(){
    this.isLoading = true;
    this.promoService.klaimPromo(this.objective.kode_promo).subscribe( (response: ResponseApi)=>{
      this.isLoading = false;
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
        
      }else{
        alert("Gagal Klaim Hadiah!")
      }
    },(error)=>{
      this.isLoading = false;
    })
  }

  startPromo(){
    this.isLoading = true;
    this.promoService.activatedPromo(this.objective.kode_promo).subscribe( (response: ResponseApi)=>{
      this.isLoading = false;
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
        this.objective.current_amount=0;
        this.promoService.selectPromo(this.objective)
        this.detectChange()
      }else{
        alert("Gagal Klaim Hadiah!")
      }
    },(error)=>{
      this.isLoading = false;
    })
  }

  detectChange(){
    this.objective = this.promoService.getSelectedPromo();
    if(this.objective == null || this.objective == undefined || this.objective.kode_promo == "-1"){
      this.isNotFound = true;
      this.isLoading = false;
    }else{
      if(this.objective.current_amount==-1){
        this.isNotStart = true;
        this.isComplete = this.isProgress = false;
        this.promoStatus="promo-box-on-progress"
      }else if(this.objective.current_amount == this.objective.target_akumulasi){
        this.isComplete = true;
        this.isNotStart = this.isProgress = false;
        this.promoStatus="promo-box-complete"
      }else if(this.objective.current_amount >= 0){
        this.isProgress = true;
        this.isNotStart = this.isComplete = false;
        this.promoStatus="promo-box-on-progress"
      }
      this.currentProgress = (this.objective.current_amount/this.objective.target_akumulasi)*100
    }
  }


}
