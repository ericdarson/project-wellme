import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-tutorial-backward',
  templateUrl: './popup-tutorial-backward.component.html',
  styleUrls: ['./popup-tutorial-backward.component.css']
})
export class PopupTutorialBackwardComponent implements OnInit {

  boxChecked : boolean;
  constructor( public dialogRef: MatDialogRef<PopupTutorialBackwardComponent>) { }

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
