import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { PlannerBeliState, StatePembelian } from 'src/app/models/planner-beli-state';
import { PlannerResiko } from 'src/app/models/planner-resiko';
import { GeturlService } from 'src/app/services/geturl.service';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-beli-reksadana',
  templateUrl: './beli-reksadana.component.html',
  styleUrls: ['./beli-reksadana.component.css']
})
export class BeliReksadanaComponent implements OnInit {
  plannerId:number|null;
  plannerResiko:PlannerResiko;
  tipe_resiko:string="";
  namaPlan:string|null;
  plannerBeliState:PlannerBeliState={
    nominal_pembelian:0,
    pembelian:[{
      id_jenis_reksadana:0,nama_plan:""
    }]
  };
  rekomendasiPembelian:number|null;
  errorMessagePercentage:string="";
  errorMessageNominalPembelian:string="";
  errorMessageKodePromo:string="";
  errorClassPercentage:string="hidden";
  errorClassNominalPembelian:string="hidden";
  errorClassKodePromo:string="hidden";
  loader:boolean=true;
  isFailedToLoad : boolean =false;
  errorStatus: number;
  constructor(private router:Router,private plannerService:PlannerPembelianService,private location:Location,private route : ActivatedRoute,private sharedService:GeturlService) {}
  
  ngOnInit(): void {
    this.checkState();
    
  }
  
  getProfileResiko():void{
    this.plannerService.getPorfileResiko().subscribe(response=>{
      
      this.plannerResiko=response.output_schema;
      
      this.plannerBeliState.pembelian=response.output_schema.detail_resiko;
      this.loader=false;
      this.syncBeliState();
      
    },error=>{
      this.errorStatus = error.status
     
      this.isFailedToLoad = true;
      
    }
    
    )
  }
  
  checkState():void{
    this.plannerId=this.plannerService.getIdDetail();
    if(this.plannerId==null)
    {
      this.router.navigate(['/financial-planner/planner-list']);
    }
    else{
      
      var pbs=this.plannerService.getPlannerBeliState();
      this.plannerBeliState=pbs!=null?pbs:this.plannerBeliState;
      this.getProfileResiko();
      this.namaPlan=this.plannerService.getNamaPlannerDetail();
      this.rekomendasiPembelian=this.plannerService.getRekomendasiPembelian();
      if(this.namaPlan==null||this.rekomendasiPembelian==null)
      {
        this.router.navigate(['/financial-planner/planner-list']);
      }
    }
  }
  
  increasePercentage(num:number):void{
    this.plannerBeliState.pembelian[num].percentage=Number(this.plannerBeliState.pembelian[num].percentage)+5>=100?100:Number(this.plannerBeliState.pembelian[num].percentage)+5;
    this.plannerService.setPlannerBeliState(this.plannerBeliState);
  }
  decreasePercentage(num:number):void{
    this.plannerBeliState.pembelian[num].percentage=Number(this.plannerBeliState.pembelian[num].percentage)-5<0?0:Number(this.plannerBeliState.pembelian[num].percentage)-5;
    this.plannerService.setPlannerBeliState(this.plannerBeliState);
  }
  
  goBack():void{
    this.location.back();
  }
  goToListReksadana(detail:any):void{
    this.plannerService.setPlannerBeliState(this.plannerBeliState);
    this.plannerService.setIdJenisReksadana(detail.id_jenis_reksadana);
    this.plannerService.setJenisReksadanaPembelian(detail.nama_plan);
    this.router.navigate(['../list-reksadana'] ,{relativeTo: this.route});
  }
  goToPromo():void{
    this.plannerService.setPlannerBeliState(this.plannerBeliState);
    this.router.navigate(['../promo'] ,{relativeTo: this.route});
  }
  
  syncBeliState():void{
    
    var p=this.plannerService.getPlannerBeliState();
    console.log('Sync Beli State ->',p)
    if(p!=null)
    {
      this.plannerBeliState=p;
    }
    this.plannerBeliState.pembelian.forEach((element,key) => {
      var reksadana=this.plannerService.getKonfirmasiByIdJenis(element.id_jenis_reksadana);
      console.log('Dari Konfirmasi ->',reksadana)
      if(reksadana!=null){
        this.plannerBeliState.pembelian[key].id_produk=reksadana.id_produk;
        this.plannerBeliState.pembelian[key].nama_produk=reksadana.nama_produk;
        this.plannerBeliState.pembelian[key].minimum_pembelian=reksadana.minimum_amount;
        this.plannerBeliState.pembelian[key].biaya_pembelian=reksadana.biaya_pembelian;
        this.plannerService.setPlannerBeliState(this.plannerBeliState);
      }
    });
  }
  //TODO: Validate Form and Confirmation
  async goToConfirmationPage()
  {
    this.resetFormPembelian();
    if(await this.isRequestPembelianValid()==true)
    {
      this.plannerService.setPlannerBeliState(this.plannerBeliState);
      this.router.navigate(['../konfirmasi-transaksi'],{relativeTo:this.route});
    }
  }
  
  async isRequestPembelianValid():Promise<boolean>{
    var promoValid=true;
    var valid=false;
    if(this.plannerBeliState.kode_promo!=undefined)
    {
      if(this.plannerBeliState.kode_promo!="")
      {promoValid=await this.isPromoValid(this.plannerBeliState.kode_promo);}
    }
    var nominalValid=this.isNominalValid()
    if(promoValid==true&&nominalValid==true)
    {
      valid=true;
    }
    return valid;
  }
  
  
  async isPromoValid(kode:string):Promise<boolean>{
    var isValid=await this.plannerService.isPromoValid(kode);
    if(isValid==false)
    {
      this.errorClassKodePromo="block";
      this.errorMessageKodePromo="Kode Promo Tidak Valid";
    }
    else{
      var num=this.plannerService.getMinimumTransactionPromo();
      if(num!=undefined)
      {
        if(this.plannerBeliState.nominal_pembelian==undefined?0:this.plannerBeliState.nominal_pembelian<num)
        {
          isValid=false;
          this.errorClassKodePromo="block";
          this.errorMessageKodePromo="Minimal Transaksi Untuk Menggunakan Kode Promo Ini Adalah Rp "+num;    
        }
      }
    }
    
    return isValid;
  }
  
  isPercentageValid():boolean{
    var percentage=0;
    
    var bool=false;
    var kosong=false;
    var isValid=true;
    var percentageValid=false;
    for (let i = 0; i < this.plannerBeliState.pembelian.length; i++) {
      var element=this.plannerBeliState.pembelian[i];
      
      if(element.percentage!=undefined&&element.percentage!=null)
      {
        percentage=Number(percentage)+Number(element.percentage)
        
        if(element.percentage!=0&&element.id_produk==undefined)
        {
          
          bool=true;
        }
        if(element.percentage==0&&element.id_produk!=undefined)
        {
          
          kosong=true;
        }
        if(element.percentage<0)
        {
          percentageValid=true;
        }
      }
      
      
    }
    if(percentage!=100||bool==true||kosong==true||percentageValid==true)
    {
      if(bool==true){
        this.errorClassPercentage="block";
        if(percentage!=100)
        {
          this.errorMessagePercentage+=' dan ';
        }
        this.errorMessagePercentage+="Persentase Yang Lebih Dari 0% Harus Memiliki Produk yang Dibeli";
        
      }
      isValid=false;
      if(percentage!=100)
      {
        this.errorClassPercentage="block";
        this.errorMessagePercentage="Persentase Tidak 100%";
      }
      
      if(kosong==true){
        this.errorClassPercentage="block";
        if(percentage!=100||bool==true)
        {
          this.errorMessagePercentage+=' dan ';
        }
        this.errorMessagePercentage+="Produk yang Dipilih Tidak Boleh Memiliki Persentase 0%";
        
      }
      
      if(percentageValid==true){
        this.errorClassPercentage="block";
        if(percentage!=100||bool==true||kosong==true)
        {
          this.errorMessagePercentage+=' dan ';
        }
        this.errorMessagePercentage+="Persentase tidak boleh minus";
        
      }
    }
    else{
      this.errorMessagePercentage="";
    }
    
    return isValid;
  }
  
  isNominalValid():boolean{
    var totalMinimumPembelian:number=0;
    var isNominalValid=true;
    var isMinPembelianValid:boolean=true;
    var isAmountValid=true;
    if(this.isPercentageValid()==true)
    { 
      for (let i = 0; i < this.plannerBeliState.pembelian.length; i++) {
        var element=this.plannerBeliState.pembelian[i];
        if(element.minimum_pembelian!=undefined)
        {
          totalMinimumPembelian= Number(totalMinimumPembelian)+Number(element.minimum_pembelian);
        }        
      }
      
      
      if(this.plannerBeliState.nominal_pembelian!=undefined)
      {
        
        if(this.plannerBeliState.nominal_pembelian<0)
        {
          
          isAmountValid=false;
        }
        if(this.plannerBeliState.nominal_pembelian<totalMinimumPembelian)
        {
          isMinPembelianValid=false;
        }
      }
      else{
        isAmountValid=false;
      }
      
      if(isAmountValid==false||isMinPembelianValid==false)
      {
        
        isNominalValid=false;
        if(isAmountValid==false)
        {
          
          this.errorClassNominalPembelian="block";
          this.errorMessageNominalPembelian="Nominal Pembelian Tidak Kosong atau Minus (-)"
        }
        if(isMinPembelianValid==false)
        {
          if(!isAmountValid)
          {
            this.errorMessageNominalPembelian+=" dan ";
          }
          this.errorClassNominalPembelian="block";
          this.errorMessageNominalPembelian+="Minimum Pembelian Anda adalah "+totalMinimumPembelian;
        }
      }
      else{
        this.errorMessageNominalPembelian="";
      }
      
      return isNominalValid;
      
      
    }
    else{
      isNominalValid=false;
    }
    return isNominalValid;
  }
  
  resetFormPembelian():void{
    this.errorClassKodePromo="hidden";
    this.errorClassNominalPembelian="hidden";
    this.errorClassPercentage="hidden";
    this.errorMessageKodePromo="";
    this.errorMessageNominalPembelian="";
    this.errorMessagePercentage="";
  }
  
  saveState(){
    this.plannerService.setPlannerBeliState(this.plannerBeliState);
  }

  retryClicked(){
    this.loader=true;
    this.isFailedToLoad = false;
    this.getProfileResiko();
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.retryClicked();
    }
  }
}
