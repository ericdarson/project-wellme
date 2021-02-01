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
import { DetailTransaksiComponent } from '../components/detail-transaksi/detail-transaksi.component';
import { PinComponent } from '../components/pin/pin.component';
import { PlannerProductComponent } from '../components/planner-product/planner-product.component';
import {MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { PlannerListReksadanaComponent } from '../components/planner-list-reksadana/planner-list-reksadana.component';
import { PlannerEditComponent } from '../components/planner-edit/planner-edit.component';
import { PlannerEditTargetComponent } from '../components/planner-edit-target/planner-edit-target.component';
import { PlannerEditDataPlannerComponent } from '../components/planner-edit-data-planner/planner-edit-data-planner.component';

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
    DetailTransaksiComponent,
    PinComponent,
    PlannerProductComponent,
    PlannerEditComponent,
    PlannerEditTargetComponent,
    PlannerEditDataPlannerComponent,
  ],
  imports: [
    CommonModule,
    FinancialPlannerRoutingModule,
    SharedModule,
    MatBottomSheetModule,

  ],
  entryComponents: [
    PlannerProductComponent
  ]
})
export class FinancialPlannerModule { }
