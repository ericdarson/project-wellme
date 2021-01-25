import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-backward-list-reksadana',
  templateUrl: './backward-list-reksadana.component.html',
  styleUrls: ['./backward-list-reksadana.component.css']
})
export class BackwardListReksadanaComponent implements OnInit {

  tempVar : any[]
  constructor(private router : Router, private location:Location,private route: ActivatedRoute) { }

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
      {
        id: "5",
        nama : "Danaa kas 5",
        nab : 12344,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
      {
        id: "6",
        nama : "Danaa kas 6",
        nab : 12344,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
      {
        id: "7",
        nama : "Danaa kas 7",
        nab : 12344,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },
      {
        id: "8",
        nama : "Danaa kas 8",
        nab : 12344,
        kinerja : "1234%",
        kategori : "Pasar Uang",
      },

    ]
    this.tempVar = temp
  }


  goToPembelianPage(idReksadana : string){
    console.log(this.router.url)
    this.router.navigate(['../backward-pembelian',idReksadana], {relativeTo: this.route})
  }

  goBack(){
    this.location.back()
  }

}
