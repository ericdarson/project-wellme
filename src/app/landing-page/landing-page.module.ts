import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LandingPageComponent } from './landing-page.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule
  ]
})
export class LandingPageModule { }
