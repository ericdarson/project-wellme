import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { ProfileService } from '../../services/profile.service';
import { ProfileMaster } from '../../models/ProfileMaster';
import { ResponseApi } from '../../models/ResponseApi';
import { GeturlService } from '../../services/geturl.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit {
  isLoading : boolean = false;
  profileMaster : ProfileMaster;
  isFailedToLoad : boolean =false;
  errorStatus : number ;

  constructor(private profileService : ProfileService ,private sharedService :GeturlService,
    private router: Router,private activeRoute : ActivatedRoute) { }

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
       this.errorStatus = error.status

        this.isLoading=false;
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

}
