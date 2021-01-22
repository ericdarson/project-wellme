import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  opacity =0.5;
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

}
