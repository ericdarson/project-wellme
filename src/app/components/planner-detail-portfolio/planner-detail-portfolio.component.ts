import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-detail-portfolio',
  templateUrl: './planner-detail-portfolio.component.html',
  styleUrls: ['./planner-detail-portfolio.component.css']
})
export class PlannerDetailPortfolioComponent implements OnInit {

  constructor(private router:Router,private plannerService:PlannerService,private location:Location) { }
  ngOnInit(): void {
  }

  goBack():void{
    this.location.back();
  }
  

}
