import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-konfirmasi-exit',
  templateUrl: './konfirmasi-exit.component.html',
  styleUrls: ['./konfirmasi-exit.component.css']
})
export class KonfirmasiExitComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<KonfirmasiExitComponent>) { }

  ngOnInit(): void {

  }


  yesClicked(){
    this.dialogRef.close(true);
  }

  noClicked(){
    this.dialogRef.close(false);
  }

}
