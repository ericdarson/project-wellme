import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SyaratKetentuanPembelianComponent } from '../syarat-ketentuan-pembelian/syarat-ketentuan-pembelian.component';

@Component({
  selector: 'app-syarat-ketentuan-penjualan',
  templateUrl: './syarat-ketentuan-penjualan.component.html',
  styleUrls: ['./syarat-ketentuan-penjualan.component.css']
})
export class SyaratKetentuanPenjualanComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SyaratKetentuanPembelianComponent>) { }

  ngOnInit(): void {
  }
  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
