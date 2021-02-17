import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileMaster } from '../../models/ProfileMaster';
import { ResponseApi } from '../../models/ResponseApi';
import { GeturlService } from '../../services/geturl.service';


import { PopupKonfirmasiLogoutComponent } from '../../popup/popup-konfirmasi-logout/popup-konfirmasi-logout.component';
import { runInThisContext } from 'vm';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  shimmering:boolean=false;
  listDisplay:string="hidden";
  notFound:string="hidden";
  display:string="block";
  showProfile: boolean= false;
  buttonShowRekening : boolean = false
  isFailedToLoad : boolean =false;
  errorStatus : number;

  profileMaster : ProfileMaster;


  constructor(private profileService : ProfileService,private sharedService :GeturlService,
    private router: Router,private activeRoute : ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfile()
  }

  buttonShowRekClicked(){
    this.buttonShowRekening = !this.buttonShowRekening
    //console.log(this.buttonShowRekening)
  }

  getProfile(){
    this.isFailedToLoad = false;
    this.shimmering = true;
    this.profileService.getProfile().subscribe((response:ResponseApi)=>{
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
         this.profileMaster = response.output_schema.detail_profile
         this.shimmering=false;
         this.showProfile = true
         this.isFailedToLoad = false;
      }
      else{
        this.notFound="block";
        this.shimmering=false;
        this.showProfile = false
        this.isFailedToLoad = true;
         //console.log("gagal get profile")
      }
     },error=>{
        this.errorStatus= error.status
        this.isFailedToLoad = true; 
     })
  }

  
  errorButtonClicked(){
    if(this.errorStatus == 403){
      this.router.navigate(['/'])
    }else{
      this.getProfile()
    }
  }

  logout(){
    const dialogRef = this.dialog.open(PopupKonfirmasiLogoutComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.sharedService.logout()
      }else{

      }
    });
  }


}
