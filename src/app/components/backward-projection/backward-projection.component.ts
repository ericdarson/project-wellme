import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupSyaratKetentuanComponent } from '../../popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { PopupTutorialBackwardComponent } from '../../popup/popup-tutorial-backward/popup-tutorial-backward.component';
import { BackwardProjectionListReksadana } from '../../models/BackwardProjectionListReksadana'
@Component({
  selector: 'app-backward-projection',
  templateUrl: './backward-projection.component.html',
  styleUrls: ['./backward-projection.component.css']
})
export class BackwardProjectionComponent implements OnInit {
  listReksadana:BackwardProjectionListReksadana[]
  isDisabled:boolean = true
  skCheck :boolean = false
  selectedId :string = ""

  constructor(public dialog: MatDialog,private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.listReksadana = [
      {
        id:"1",
        nama:"nama",
        selected:false
      },{
        id:"2",
        nama:"nama2",
        selected:false
      },{
        id:"2",
        nama:"nama2",
        selected:false
      },{
        id:"2",
        nama:"nama2",
        selected:false
      },{
        id:"2",
        nama:"nama2",
        selected:false
      },
    ]
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
  choose(item: BackwardProjectionListReksadana){
    this.listReksadana.forEach (
      function(single) {
        single.selected = false;
      }
    );
    item.selected = true;
    this.selectedId = item.id;
  }

  setClass(item: BackwardProjectionListReksadana){
    let classes =  {
      'item-box-choosen': item.selected,
      'item-box': !item.selected
    }
    return classes
  }

  checkDisable():boolean{
    if (this.skCheck){
      let validity = true;
      this.listReksadana.forEach( function (single) {
        if (single.selected) validity = false;
      });
      return validity;
    }else{
      return true
    }
  }
}
