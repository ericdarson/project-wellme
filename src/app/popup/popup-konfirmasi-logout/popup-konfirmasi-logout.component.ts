import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupSyaratKetentuanComponent } from '../popup-syarat-ketentuan/popup-syarat-ketentuan.component';

@Component({
  selector: 'app-popup-konfirmasi-logout',
  templateUrl: './popup-konfirmasi-logout.component.html',
  styleUrls: ['./popup-konfirmasi-logout.component.css']
})
export class PopupKonfirmasiLogoutComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PopupSyaratKetentuanComponent>) { }

  ngOnInit(): void {
  }

  yesClicked(){
    this.dialogRef.close(true)
  }

  noClicked(){
    this.dialogRef.close(false)
  }
  


}
