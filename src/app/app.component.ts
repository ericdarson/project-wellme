import { Component, OnInit } from '@angular/core';
import { CheckSessionService } from './services/check-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'wellme-project';

  constructor(private checkSession: CheckSessionService) { }

  ngOnInit(): void {
    //this.checkSession.checkSession();
  }
}

