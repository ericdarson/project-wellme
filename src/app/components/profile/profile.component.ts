import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileMaster } from '../../models/ProfileMaster';
import { ResponseApi } from '../../models/ResponseApi';
import { GeturlService } from '../../services/geturl.service';

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
    private router: Router,private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getProfile()
  }

  buttonShowRekClicked(){
    this.buttonShowRekening = !this.buttonShowRekening
    console.log(this.buttonShowRekening)
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
         console.log("gagal get profile")
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


}
