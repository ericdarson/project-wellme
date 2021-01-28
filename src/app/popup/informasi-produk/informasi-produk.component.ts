import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-informasi-produk',
  templateUrl: './informasi-produk.component.html',
  styleUrls: ['./informasi-produk.component.css']
})
export class InformasiProdukComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<InformasiProdukComponent>) {}

  ngOnInit(): void {
  }
  onCloseDialog(): void {
    this.dialogRef.close();
  }

}
