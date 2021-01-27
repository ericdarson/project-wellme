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

  buttonShowRekening : boolean = false

  profileMaster : ProfileMaster;
  norek : string;

  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((response:ResponseApi)=>{
      console.log(response)
     if (response.error_schema.error_message.indonesian=="BERHASIL")
     {
        this.profileMaster = response.output_schema.detail_profile
        console.log(this.profileMaster)
        console.log(this.profileMaster.email)
        
        console.log(this.profileMaster.noRekBCA)
        this.norek = this.profileMaster.noRekBCA
        console.log(this.norek)
     }
     else{
        console.log("gagal get profile")
     }
    })
  }

  buttonShowRekClicked(){
    this.buttonShowRekening = !this.buttonShowRekening
    console.log(this.buttonShowRekening)
  }

}
