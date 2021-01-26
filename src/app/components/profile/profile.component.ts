import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  buttonShowRekening : boolean = false

  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(response=>{
      console.log(response)
     if (response.error_schema.error_message.indonesian=="BERHASIL")
     {
        console.log(response.output_schema)
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
