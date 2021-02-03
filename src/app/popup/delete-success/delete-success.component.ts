import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.css']
})
export class DeleteSuccessComponent implements OnInit {

 
  constructor(  public dialogRef: MatDialogRef<DeleteSuccessComponent>) {}

  ngOnInit(): void {
  }
  onCloseDialog(): void {
    this.dialogRef.close();
  }

}
