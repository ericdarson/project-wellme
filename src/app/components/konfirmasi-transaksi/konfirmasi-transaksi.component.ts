import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupSyaratKetentuanComponent } from 'src/app/popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';

@Component({
  selector: 'app-konfirmasi-transaksi',
  templateUrl: './konfirmasi-transaksi.component.html',
  styleUrls: ['./konfirmasi-transaksi.component.css']
})
export class KonfirmasiTransaksiComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openSKPopup():void{
    const dialogRef = this.dialog.open(PopupSyaratKetentuanComponent, {
      height:'500px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
