import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PromoRoutingModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';
import { PromoListComponent } from '../components/promo-list/promo-list.component';
import { FailedToLoadComponent } from '../components/failed-to-load/failed-to-load.component';

@NgModule({
  declarations: [PromoComponent,    
    PromoListComponent],
  imports: [
    CommonModule,
    PromoRoutingModule,
    SharedModule,

  ]
})
export class PromoModule { }
