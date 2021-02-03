import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SyaratKetentuanPembelianComponent } from 'src/app/popup/syarat-ketentuan-pembelian/syarat-ketentuan-pembelian.component';

@Component({
  selector: 'app-planner-edit-success',
  templateUrl: './planner-edit-success.component.html',
  styleUrls: ['./planner-edit-success.component.css']
})
export class PlannerEditSuccessComponent implements OnInit {


  constructor(  public dialogRef: MatDialogRef<PlannerEditSuccessComponent>) {}

  ngOnInit(): void {
  }
  onCloseDialog(): void {
    this.dialogRef.close();
  }

}
