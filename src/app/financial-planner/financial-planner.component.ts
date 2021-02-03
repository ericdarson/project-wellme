import { Component, OnInit } from '@angular/core';
import { GeturlService } from '../services/geturl.service';

@Component({
  selector: 'app-financial-planner',
  templateUrl: './financial-planner.component.html',
  styleUrls: ['./financial-planner.component.css']
})
export class FinancialPlannerComponent implements OnInit {

  constructor(private getUrlService:GeturlService) { }

  ngOnInit(): void {
    this.getUrlService.checkUserLogin();
  }

}
