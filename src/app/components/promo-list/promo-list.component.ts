import { Clipboard } from '@angular/cdk/clipboard';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {  Objectives, PromotionResponse, Promotions,History } from '../../models/Promotion';
import { ResponseApi } from '../../models/ResponseApi';
import { GeturlService } from '../../services/geturl.service';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css']
})
export class PromoListComponent implements OnInit {
  activeState:string[]=["btn-active","btn-non-active","btn-non-active"]

  listObjectives : Objectives[];
  listPromotions : Promotions[];
  listHistories : History[];
  isObjectiveActive: boolean =true;
  isPromotionActive : boolean=false;
  isHistoryActive : boolean= false;
  isLoading : boolean = false;
  isNotFound : boolean = false;
  isFailedToLoad : boolean = false;
  errorStatus : number;

  promoResponse : PromotionResponse;
  constructor(private promoService : PromoService,private router : Router,
    private clipboard: Clipboard,private _snackBar: MatSnackBar, private route :ActivatedRoute,private sharedService : GeturlService ) { }
  
  ngOnInit(): void {
    this.getPromo()

    
  }
  
  toggleBtn(num:number):void{
    if(num==0)
    {
      this.isObjectiveActive = true;
      this.isPromotionActive = this.isHistoryActive=false
      this.activeState=["btn-active","btn-non-active","btn-non-active"];
    }
    else if(num==1){
      this.isPromotionActive  = true;
      this.isHistoryActive = this.isObjectiveActive=false
      this.activeState=["btn-non-active","btn-active","btn-non-active"];
    }
    else if(num==2){
      this.isHistoryActive  = true;
      this.isObjectiveActive = this.isPromotionActive=false
      this.activeState=["btn-non-active","btn-non-active","btn-active"];
    }
  }

  getPromo(){
    this.isFailedToLoad = false;
    this.isLoading = true;
    this.promoService.getPromo().subscribe( (response: ResponseApi)=>{
      this.isLoading = false;
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
        this.promoResponse = response.output_schema
        this.listObjectives = this.promoResponse.objectives
        this.listPromotions = this.promoResponse.promotions
        this.listHistories = this.promoResponse.history
        
      }else{
        this.isFailedToLoad = true;
      }
    },(error)=>{
      this.errorStatus= error.status
      this.isFailedToLoad = true; 
      this.isLoading =false
    })
  }
  
  backClicked(){
    this.router.navigate(['../index/more'])
  }

  copyCodeClicked(kode_promo :string){
    this.clipboard.copy(kode_promo);
    this.openSnackBar("Kode Promo di Salin!")
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000,
    });
  }

  goToObjectiveDetail(objectives : Objectives){
    this.promoService.selectPromo(objectives)
    this.router.navigate(['../detail'], {relativeTo: this.route});
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.getPromo();
    }
  }
  
}
