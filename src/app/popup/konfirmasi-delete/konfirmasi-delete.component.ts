import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupTutorialBackwardComponent } from '../popup-tutorial-backward/popup-tutorial-backward.component';

@Component({
  selector: 'app-konfirmasi-delete',
  templateUrl: './konfirmasi-delete.component.html',
  styleUrls: ['./konfirmasi-delete.component.css']
})
export class KonfirmasiDeleteComponent implements OnInit {
  boxChecked : boolean;
  constructor( public dialogRef: MatDialogRef<KonfirmasiDeleteComponent>) { }

  ngOnInit(): void {
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }


  setCheck(checked: boolean) {
    this.boxChecked = checked
  }

  yesClicked(){
    this.dialogRef.close(true);
  }

  noClicked(){
    this.dialogRef.close(false);
  }

}
