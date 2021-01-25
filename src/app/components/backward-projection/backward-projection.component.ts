import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupSyaratKetentuanComponent } from '../../popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { PopupTutorialBackwardComponent } from '../../popup/popup-tutorial-backward/popup-tutorial-backward.component';

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

  constructor(public dialog: MatDialog,private router : Router,private route : ActivatedRoute) { }

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

  openTutorialBackward():void{
    const dialogRef = this.dialog.open(PopupTutorialBackwardComponent, {
      height:'350px',
      width: '350px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      if(result){
        this.router.navigate(['../backward-tutorial'], {relativeTo: this.route})
      }else{
        this.router.navigate(['../backward-list-reksadana'], {relativeTo: this.route})
      }
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
