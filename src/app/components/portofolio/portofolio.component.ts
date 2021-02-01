import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { ProfileService } from '../../services/profile.service';
import { ProfileMaster } from '../../models/ProfileMaster';
import { ResponseApi } from '../../models/ResponseApi';
import { GeturlService } from '../../services/geturl.service';

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit {
  isLoading : boolean = false;
  profileMaster : ProfileMaster;
  isFailedToLoad : boolean =false;

  constructor(private profileService : ProfileService ,private sharedService :GeturlService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.isLoading =true
    this.isFailedToLoad = false
    this.profileService.getProfile().subscribe((response:ResponseApi)=>{
      // console.log(response)
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
         this.profileMaster = response.output_schema.detail_profile
        //  console.log(this.profileMaster)
        //  console.log(this.profileMaster.email)
         this.isLoading=false;
      }
      else{
        this.isLoading=false;
        this.isFailedToLoad = true;
        //  console.log("gagal get profile")
      }
     },error=>{
      if(error.status = 403){
        this.sharedService.logout()
      }else{
        this.isLoading=false;
        this.isFailedToLoad = true;
      }
     })
  }

  retryClicked(){
    this.getProfile()
  }

}
