import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-failed-to-load',
  templateUrl: './failed-to-load.component.html',
  styleUrls: ['./failed-to-load.component.css']
})
export class FailedToLoadComponent implements OnInit {
  image : string;
  buttonText : string;
  descText : string;

  @Output()
  onButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  errorStatus: number;

  constructor() { }

  ngOnInit(): void {
    if(this.errorStatus == 403){
      this.image = "assets/img/error_page_403.png"
      this.buttonText = "Menu Utama"
      this.descText = "Akses Terbatas Mohon Kembali ke Menu Utama"
    }else{
      this.image = "assets/icon/failed-to-load-icon.png"
      this.buttonText = "Muat Ulang"
      this.descText = "Koneksi Error Mohon Coba Lagi"
    }

  }

  buttonClicked(){
    this.onButtonClicked.emit("");
  }

}
