import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupSyaratKetentuanComponent } from '../../popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { PopupTutorialBackwardComponent } from '../../popup/popup-tutorial-backward/popup-tutorial-backward.component';
import { BackwardProjectionListJenisReksadana } from '../../models/BackwardProjectionListJenisReksadana'
import { BackwardProjectionListJenisReksadanaResponse } from '../../models/BackwardProjectionListJenisReksadana'
import { BackwardProjectionListReksadanaService } from '../../services/backward-projection-list-reksadana.service'
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-backward-projection',
  templateUrl: './backward-projection.component.html',
  styleUrls: ['./backward-projection.component.css']
})
export class BackwardProjectionComponent implements OnInit {
  listReksadana:BackwardProjectionListJenisReksadana[]
  isDisabled:boolean = true
  skCheck :boolean = false
  selectedId :string = "0"
  selectedJenis:string = ""
  isLoading:boolean = true;
  isFailedToLoad:boolean = false;
  errorStatus : number;
  showTutorDialog: boolean =true;

  constructor(public dialog: MatDialog,private router : Router,private route : ActivatedRoute,
     private service : BackwardProjectionListReksadanaService,private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.listReksadana = [];
    if(this.localStorage.retrieve("dialogTutorialBackward")!=null || this.localStorage.retrieve("dialogTutorialBackward") != undefined){
      this.showTutorDialog = !this.localStorage.retrieve("dialogTutorialBackward")
    }
   
    this.retryClicked();

  }

  openSKPopup():void{
    const dialogRef = this.dialog.open(PopupSyaratKetentuanComponent, {
      height:'400px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });
  }

  openTutorialBackward():void{
    if(this.showTutorDialog){
      const dialogRef = this.dialog.open(PopupTutorialBackwardComponent, {
        height:'350px',
        width: '350px',
        disableClose: true 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.service.setJenisReksadana(this.selectedJenis);
        //console.log('The dialog was closed ' + result);
        if(result){
          this.router.navigate(['../backward-tutorial/'+this.selectedId], {relativeTo: this.route})
        }else{
          this.router.navigate(['../backward-list-reksadana/'+this.selectedId], {relativeTo: this.route})
        }
      });
    }else{
      this.service.setJenisReksadana(this.selectedJenis);
      this.router.navigate(['../backward-list-reksadana/'+this.selectedId], {relativeTo: this.route})
    }
    
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
    this.selectedJenis = item.nama;
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

  retryClicked(){
    this.isLoading = true;
    this.isFailedToLoad = false;
    this.service.getListJenis().subscribe(response=>{
      // //console.log(response)
      if (response.error_schema.error_code=="BIT-00-000")
      {
        response.output_schema.forEach((element:BackwardProjectionListJenisReksadanaResponse) => {
          let single = new BackwardProjectionListJenisReksadana()
          single.id = element.id_jenis_reksadana;
          single.nama = element.jenis_reksadana;
          single.selected = false
          this.listReksadana.push(single)
        });
        
        this.isLoading = false
        this.isFailedToLoad = false;
        this.choose(this.listReksadana[0])
      }
    }, error=>{
      this.errorStatus = error.status
      this.isFailedToLoad = true;
    })
  }

  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.retryClicked();
    }
  }

  goToTutorialPage(){
    if(this.showTutorDialog){
      const dialogRef = this.dialog.open(PopupTutorialBackwardComponent, {
        height:'350px',
        width: '350px',
        disableClose: true 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.service.setJenisReksadana(this.selectedJenis);
        //console.log('The dialog was closed ' + result);
        if(result){
          this.router.navigate(['../backward-tutorial/'+this.selectedId], {relativeTo: this.route})
        }
      });
    }else{
      this.service.setJenisReksadana(this.selectedJenis);
      this.router.navigate(['../backward-tutorial/'+this.selectedId], {relativeTo: this.route})
    }
  }
}
