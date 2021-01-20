import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  buttonShowRekening : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  buttonShowRekClicked(){
    this.buttonShowRekening = !this.buttonShowRekening
    console.log(this.buttonShowRekening)
  }

}
