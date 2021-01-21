import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupSyaratKetentuanComponent } from '../../popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';

@Component({
  selector: 'app-backward-projection',
  templateUrl: './backward-projection.component.html',
  styleUrls: ['./backward-projection.component.css']
})
export class BackwardProjectionComponent implements OnInit {

  isDisabled:boolean = true
  skCheck :boolean = false
  pasarUangBool : boolean= false
  obligasiBool : boolean= false
  sahamBool : boolean= false

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openSKPopup():void{
    const dialogRef = this.dialog.open(PopupSyaratKetentuanComponent, {
      height:'400px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  setSk(checked: boolean) {
    this.skCheck = checked
  }

  pasarUangChoose(){
    this.pasarUangBool = true
    this.obligasiBool = this.sahamBool = false
  }

  obligasiChoose(){
    this.obligasiBool = true
    this.sahamBool = this.pasarUangBool= false
  }

  sahamChoose(){
    this.sahamBool = true
    this.obligasiBool = this.pasarUangBool= false
  }


  checkDisable():boolean{
    if (this.skCheck){
      if(this.pasarUangBool || this.sahamBool ||this.obligasiBool ){
        return false
      }else{
        return true
      }
    }else{
      return true
    }
  }
}
