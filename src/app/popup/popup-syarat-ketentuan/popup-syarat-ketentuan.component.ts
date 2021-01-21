import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-syarat-ketentuan',
  templateUrl: './popup-syarat-ketentuan.component.html',
  styleUrls: ['./popup-syarat-ketentuan.component.css']
})
export class PopupSyaratKetentuanComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupSyaratKetentuanComponent>) {}

  ngOnInit(): void {
  
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
