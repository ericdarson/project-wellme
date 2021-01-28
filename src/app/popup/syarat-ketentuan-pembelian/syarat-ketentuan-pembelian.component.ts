import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupSyaratKetentuanComponent } from '../popup-syarat-ketentuan/popup-syarat-ketentuan.component';

@Component({
  selector: 'app-syarat-ketentuan-pembelian',
  templateUrl: './syarat-ketentuan-pembelian.component.html',
  styleUrls: ['./syarat-ketentuan-pembelian.component.css']
})
export class SyaratKetentuanPembelianComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<SyaratKetentuanPembelianComponent>) {}

  ngOnInit(): void {
  }
  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
