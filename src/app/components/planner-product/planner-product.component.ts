import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { SyaratKetentuanPembelianComponent } from 'src/app/popup/syarat-ketentuan-pembelian/syarat-ketentuan-pembelian.component';
import { PlannerPembelianService } from 'src/app/services/planner-pembelian.service';
import { PlannerListReksadanaComponent } from '../planner-list-reksadana/planner-list-reksadana.component';

@Component({
  selector: 'app-planner-product',
  templateUrl: './planner-product.component.html',
  styleUrls: ['./planner-product.component.css']
})
export class PlannerProductComponent implements OnInit {

  constructor(private plannerService:PlannerPembelianService,public dialog: MatDialog) {}
  reksadana:any;
  ngOnInit(): void {
    this.reksadana=this.plannerService.getLocalStorage("detail-reksadana");
  
  }
  openSKPopup():void{
    const dialogRef = this.dialog.open(SyaratKetentuanPembelianComponent, {
      height:'500px',
      width: '400px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
