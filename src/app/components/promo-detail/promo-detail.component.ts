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
  promoStatus="promo-box-complete"
  promoId:string=""
  objective : Objectives;
  isNotFound : boolean = false;
  isLoading : boolean = false;

  constructor(private route : ActivatedRoute ,private router :Router,private promoService : PromoService) { 
    
  }

  ngOnInit(): void {

    console.log(this.promoService.getSelectedPromo())
    
    this.objective = this.promoService.getSelectedPromo();
    if(this.objective == null || this.objective == undefined){
      this.isNotFound = true;
    }
  }

  backClicked(){
    this.router.navigate(['../list'], {relativeTo: this.route})
  }

}
