import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-planner-edit',
  templateUrl: './planner-edit.component.html',
  styleUrls: ['./planner-edit.component.css']
})
export class PlannerEditComponent implements OnInit {

  constructor(private plannerService:PlannerService,private route:Router,private location:Location) { }

  ngOnInit(): void {
    this.checkState();

  }
  checkState():void{
  }
  goBack()
  {
    this.location.back();
  }

}
