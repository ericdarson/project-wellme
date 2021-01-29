import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    console.log(this.promoService.getSelectedPromo())
    
    this.objective = this.promoService.getSelectedPromo();
    if(this.objective == null || this.objective == undefined){
      this.isNotFound = true;
    }
    if(this.objective.current_amount==-1){
      this.isNotStart = true;
      this.promoStatus="promo-box-on-progress"
    }else if(this.objective.current_amount >= 0){
      this.isProgress = true;
      this.promoStatus="promo-box-on-progress"
    }else if(this.objective.current_amount == this.objective.target_akumulasi){
      this.isComplete = true;
      this.promoStatus="promo-box-complete"
    }
    this.currentProgress = (this.objective.current_amount/this.objective.target_akumulasi)*100
    console.log(this.currentProgress)
  }

  backClicked(){
    this.router.navigate(['../list'], {relativeTo: this.route})
  }

}
