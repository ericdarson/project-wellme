import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;
  constructor() { 

  
  }

  ngOnDestroy(){
    // console.log("destroy")
   
  }

  ngOnInit(): void {
   
  }
 
}
