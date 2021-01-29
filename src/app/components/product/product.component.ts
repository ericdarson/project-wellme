import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../models/product-type';
import { ResponseApi } from '../../models/ResponseApi';
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service';
import { FailedToLoadComponent } from '../failed-to-load/failed-to-load.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  isLoading : boolean=false;
  productTypes : ProductType[];
  isFailedToLoad : boolean=false;

  constructor(private backwardService : BackwardProjectionListReksadanaService) { }
  x : number =3;
  ngOnInit(): void {  
  }


  getAllReksadanaType(){
    this.isLoading =true
    this.backwardService.getListJenis().subscribe((response:ResponseApi)=>{
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
        this.productTypes = response.output_schema
        console.log(this.productTypes)
        console.log(this.productTypes[0])
        this.isLoading=false;
      }
      else{
        console.log(response)
        this.isLoading=false;
        this.isFailedToLoad = true;
      }
     },(error)=>{
        this.isFailedToLoad = true;
     })
  }
  
}
