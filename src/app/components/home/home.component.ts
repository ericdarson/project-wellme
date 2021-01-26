import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : any

  constructor(private dataService: ProfileService,private globals :Globals) { }

  ngOnInit() {
    
  }

}
