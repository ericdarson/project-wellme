import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-backward-module',
  templateUrl: './backward-module.component.html',
  styleUrls: ['./backward-module.component.css']
})
export class BackwardModuleComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute, private router: Router) { }
  
  isInTutorialPage:boolean=false

  ngOnInit(): void {
    if(this.router.url.indexOf('tutorial') > -1){
      this.isInTutorialPage= true
    }
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isInTutorialPage= true
      }
  });
  }

}
