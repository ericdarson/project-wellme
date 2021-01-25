import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.css']
})
export class PromoDetailComponent implements OnInit {
  promoStatus="promo-box-complete"
  promoId:string=""
  constructor(private route : ActivatedRoute) { 

    this.route.paramMap.subscribe(params => {
      this.promoId = params.get('id')!
    });
  }

  ngOnInit(): void {
  }

}
