import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-financial-planner-list',
  templateUrl: './financial-planner-list.component.html',
  styleUrls: ['./financial-planner-list.component.css']
})
export class FinancialPlannerListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  portofolioClicked():void{
    this.router.navigate(['/financial-planner/detail-planner'])
  }
}
