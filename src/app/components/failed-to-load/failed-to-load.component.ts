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
  @Input()
  buttonText: string;
  @Input()
  descText: string;
  @Input()
  image: string;

  constructor() { }

  ngOnInit(): void {
    if(this.descText==''|| this.descText==null || this.descText == undefined){
      this.descText ="Gagal Memuat Data!"
    }
    if(this.image==''|| this.image==null || this.image == undefined){
      this.image ="assets/icon/failed-to-load-icon.png"
    }

  }

  buttonClicked(){
    this.onButtonClicked.emit("");
  }

}
