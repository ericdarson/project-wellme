import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-failed-to-load',
  templateUrl: './failed-to-load.component.html',
  styleUrls: ['./failed-to-load.component.css']
})
export class FailedToLoadComponent implements OnInit {
  @Output()
  onButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(){
    this.onButtonClicked.emit("");
  }

}
