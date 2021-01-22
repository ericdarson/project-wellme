import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialPlannerListComponent } from './components/financial-planner-list/financial-planner-list.component';
import { HomeComponent } from './components/home/home.component';
import { IndexModule } from './index/index.module';

import { PilihTargetComponent } from './components/pilih-target/pilih-target.component';
import { PortofolioBaruComponent } from './components/portofolio-baru/portofolio-baru.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SimulasiPlannerComponent } from './components/simulasi-planner/simulasi-planner.component';
import { BackwardProjectionComponent } from './components/backward-projection/backward-projection.component';
import { BackwardListReksadanaComponent } from './components/backward-list-reksadana/backward-list-reksadana.component';
import { BackwardPembelianComponent } from './components/backward-pembelian/backward-pembelian.component';
import { BackwardSimulasiComponent } from './components/backward-simulasi/backward-simulasi.component';
import { SummaryPlannerComponent } from './components/summary-planner/summary-planner.component';
import { DetailPlannerComponent } from './components/detail-planner/detail-planner.component';
import { BeliReksadanaComponent } from './components/beli-reksadana/beli-reksadana.component';
import { PromoKodeComponent } from './components/promo-kode/promo-kode.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { KonfirmasiTransaksiComponent } from './components/konfirmasi-transaksi/konfirmasi-transaksi.component';
import { FinancialPlannerModule } from './financial-planner/financial-planner.module';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'index',  loadChildren: () => IndexModule },
  { path: 'financial-planner',  loadChildren: () => FinancialPlannerModule},
  { path: 'backward-projection', component:BackwardProjectionComponent},
  { path: 'backward-list-reksadana', component:BackwardListReksadanaComponent},
  { path: 'backward-pembelian/:id', component:BackwardPembelianComponent},
  { path: 'backward-simulasi/:id', component:BackwardSimulasiComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
