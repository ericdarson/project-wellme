import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent,NgbSlideEventSource  } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-backward-tutorial',
  templateUrl: './backward-tutorial.component.html',
  styleUrls: ['./backward-tutorial.component.css']
})
export class BackwardTutorialComponent implements OnInit {

  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;
  imageBackgroundArray : string[];
  textTutorial : string[];
  page : number =0;

  imgags = [
    'assets/img/tutorial-1.png',
    'assets/img/tutorial-2.png',
    'assets/img/tutorial-3.png',
    'assets/img/tutorial-4.png'
  ];
  idJenis :string;

  constructor(private activeRoute : ActivatedRoute, private location : Location,private router : Router) { }
    
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.idJenis = params.get("id")!
    });

    this.imageBackgroundArray = [
      'assets/img/tutorial-1.png',
      'assets/img/tutorial-2.png',
      'assets/img/tutorial-3.png',
      'assets/img/tutorial-4.png',
      'assets/img/tutorial-5.png',
      'assets/img/tutorial-6.png',
      'assets/img/tutorial-7.png',
      'assets/img/tutorial-8.png',
      'assets/img/tutorial-9.png',
      'assets/img/tutorial-10.png',
      'assets/img/tutorial-11.png',
      'assets/img/tutorial-12.png',
      'assets/img/tutorial-13.png',
      'assets/img/tutorial-14.png',
      'assets/img/tutorial-15.png',
      'assets/img/tutorial-16.png',
      'assets/img/tutorial-17.png',
    ]

    this.textTutorial=[
      "Pada halaman ini,kamu dapat memilih,kategori produk apa yang kamu ingin simulasikan,yaitu, pasar uang, obligasi dan saham.",
      "Jangan lupa untuk mencentang dan membaca syarat serta ketentuan simulasi trading ya, setelah itu tekan tombol lanjut",
      "Setelah memilih kategori,kamu dapat memilih produkmana yang ingin kamu simulasikan,tekan tombol pilih untuk menuju halaman selanjutnya",
      "Pada halaman ini kamu dapat melihat beberapa analisa dasar tentang produk yang kamu pilih, seperti grafik.",
      "Kamu juga bisa memilih dan melihat performa reksadana dengan durasi tertentu.",
      "Setelah itu, kamu dapat memasukkan nominal yang kamu inginkan.\n Namun perlu diperhatikan,setiap reksadana memiliki minimal pembelian yang berbeda.",
      "Jangan lupa untuk memilih tanggal beli reksadana yang kamu inginkan.\n Perlu diperhatikan setiap reksadana mempunyai tanggal yang berbeda.",
      "Tekan tombol Simulasi, untuk melihat proyeksi dari produk yang kamu pilih.",
      "Pada halaman ini, kamu dapat menentukan lamanya periode investasi yang kamu inginkan.",
      "Pada halaman ini, kamu dapat menentukan lamanya periode investasi yang kamu inginkan.",
      "Tekan tombol Terapkan, untuk mengatur durasi investasi yang kamu inginkan.",
      "Akan muncul hasil proyeksi sesuai dengan durasi yang ditentukan.\n Perlu diperhatikan simulasi menggunakan data reksadana selama 5 tahun terakhir.",
      "Kamu juga dapat melihat proyeksi secara terperinci dengan menekan tombol ini.",
      "Berikut merupakan tampilan dari Proyeksi produk yang sedang disimulasikan.",
      "Setelah selesai melihat, kamu dapat kembali ke halaman sebelumnya.",
      "Untuk mengakhiri proses simulasi, tekan tombol Selesai di bagian bawah layar.",
    ]

    
  }

  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.current);
    this.page = +ngbSlideEvent.current
  }

  clickNextButton(){
    this.goToNext()
  }

  // Move to specific slide
  navigateToSlide(item:any) {
    this.ngCarousel.select(item);
    console.log(item)
  }

  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }

  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }

  // Pause slide
  stopCarousel() {
    this.ngCarousel.pause();
  }

  // Restart carousel
  restartCarousel() {
    this.ngCarousel.cycle();
  }

  clickExitButton(){
    this.router.navigate(['../../backward-list-reksadana/'+this.idJenis],{relativeTo:this.activeRoute})
  }
}
