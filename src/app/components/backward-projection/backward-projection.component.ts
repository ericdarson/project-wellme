import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupSyaratKetentuanComponent } from '../../popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { PopupTutorialBackwardComponent } from '../../popup/popup-tutorial-backward/popup-tutorial-backward.component';
import { BackwardProjectionListJenisReksadana } from '../../models/BackwardProjectionListJenisReksadana'
import { BackwardProjectionListJenisReksadanaResponse } from '../../models/BackwardProjectionListJenisReksadana'
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'

@Component({
  selector: 'app-backward-projection',
  templateUrl: './backward-projection.component.html',
  styleUrls: ['./backward-projection.component.css']
})
export class BackwardProjectionComponent implements OnInit {
  listReksadana:BackwardProjectionListJenisReksadana[]
  isDisabled:boolean = true
  skCheck :boolean = false
  selectedId :string = ""

  constructor(public dialog: MatDialog,private router : Router,private route : ActivatedRoute, private service : BackwardProjectionListReksadanaService) { }

  ngOnInit(): void {
    this.listReksadana = [];
    this.service.getListJenis().subscribe(response=>{
      console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        response.output_schema.forEach((element:BackwardProjectionListJenisReksadanaResponse) => {
          let single = new BackwardProjectionListJenisReksadana()
          single.id = element.id_jenis_reksadana;
          single.nama = element.jenis_reksadana;
          single.selected = false
          this.listReksadana.push(single)
        });
      }
    })
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
        this.router.navigate(['../backward-tutorial/'+this.selectedId], {relativeTo: this.route})
      }else{
        this.router.navigate(['../backward-list-reksadana/'+this.selectedId], {relativeTo: this.route})
      }
    });
  }

  setSk(checked: boolean) {
    this.skCheck = checked
  }
  choose(item: BackwardProjectionListJenisReksadana){
    this.listReksadana.forEach (
      function(single) {
        single.selected = false;
      }
    );
    item.selected = true;
    this.selectedId = item.id;
  }

  setClass(item: BackwardProjectionListJenisReksadana){
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
