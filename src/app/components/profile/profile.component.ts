import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileMaster } from '../../models/ProfileMaster';
import { ResponseApi } from '../../models/ResponseApi';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  shimmering:boolean=true;
  listDisplay:string="hidden";
  notFound:string="hidden";
  display:string="block";
  showProfile: boolean= false;
  buttonShowRekening : boolean = false

  profileMaster : ProfileMaster;


  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  buttonShowRekClicked(){
    this.buttonShowRekening = !this.buttonShowRekening
    console.log(this.buttonShowRekening)
  }

  getProfile(){
    this.profileService.getProfile().subscribe((response:ResponseApi)=>{
      if (response.error_schema.error_message.indonesian=="BERHASIL")
      {
         this.profileMaster = response.output_schema.detail_profile
         console.log(this.profileMaster)
         console.log(this.profileMaster.email)
         this.shimmering=false;
         this.showProfile = true
      }
      else{
        this.notFound="block";
        this.shimmering=false;
        this.showProfile = false
         console.log("gagal get profile")
      }
     })
  }

}
