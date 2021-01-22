import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialPlannerRoutingModule } from './financial-planner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FinancialPlannerListComponent } from '../components/financial-planner-list/financial-planner-list.component';
import { PilihTargetComponent } from '../components/pilih-target/pilih-target.component';
import { PortofolioBaruComponent } from '../components/portofolio-baru/portofolio-baru.component';
import { SimulasiPlannerComponent } from '../components/simulasi-planner/simulasi-planner.component';
import { SummaryPlannerComponent } from '../components/summary-planner/summary-planner.component';
import { DetailPlannerComponent } from '../components/detail-planner/detail-planner.component';
import { BeliReksadanaComponent } from '../components/beli-reksadana/beli-reksadana.component';
import { PromoKodeComponent } from '../components/promo-kode/promo-kode.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { KonfirmasiTransaksiComponent } from '../components/konfirmasi-transaksi/konfirmasi-transaksi.component';
import { BrowserModule } from '@angular/platform-browser';
import { FinancialPlannerComponent } from './financial-planner.component';


@NgModule({
  declarations: [
    FinancialPlannerListComponent,
    PilihTargetComponent,
    PortofolioBaruComponent,
    SimulasiPlannerComponent,
    SummaryPlannerComponent,
    DetailPlannerComponent,
    BeliReksadanaComponent,
    PromoKodeComponent,
    ProductDetailComponent,
    KonfirmasiTransaksiComponent,
    FinancialPlannerComponent,
  ],
  imports: [
    CommonModule,
    FinancialPlannerRoutingModule,
    SharedModule
  ]
})
export class FinancialPlannerModule { }
