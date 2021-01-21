import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backward-list-reksadana',
  templateUrl: './backward-list-reksadana.component.html',
  styleUrls: ['./backward-list-reksadana.component.css']
})
export class BackwardListReksadanaComponent implements OnInit {

  tempVar : any[]
  constructor(private router : Router) { }

  ngOnInit(): void {

    const temp =[
      {
        id: "1",
        nama : "Danaa kas 1",
        nab : 12341,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
      {
        id: "2",
        nama : "Danaa kas 2",
        nab : 12342,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
      {
        id: "3",
        nama : "Danaa kas 3",
        nab : 12343,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
      {
        id: "4",
        nama : "Danaa kas 4",
        nab : 12344,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
    ]
    this.tempVar = temp
  }


  goToPembelianPage(idReksadana : string){
    this.router.navigate(['./backward-pembelian',idReksadana])
  }

}
