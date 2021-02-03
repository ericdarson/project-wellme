import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  opacity =0.5;

  @ViewChild('sidenav') sidenav: any;

  constructor(private scrollDispatcher: ScrollDispatcher,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.scrollDispatcher.scrolled().subscribe((event:any) => {
      const temp : CdkScrollable =event
      const scroll = temp.measureScrollOffset("top");
      let newOpacity = this.opacity;

      if (scroll > 0) {
        newOpacity = 1;
      } else {
        newOpacity =0.5;
      }

      if (newOpacity !== this.opacity) {
        this.zone.run(() => {
          this.opacity = newOpacity;
        });
      }
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}
