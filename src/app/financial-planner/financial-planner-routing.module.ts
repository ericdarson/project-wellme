import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeliReksadanaComponent } from '../components/beli-reksadana/beli-reksadana.component';
import { DetailPlannerComponent } from '../components/detail-planner/detail-planner.component';
import { DetailTransaksiComponent } from '../components/detail-transaksi/detail-transaksi.component';
import { FinancialPlannerListComponent } from '../components/financial-planner-list/financial-planner-list.component';
import { KonfirmasiTransaksiComponent } from '../components/konfirmasi-transaksi/konfirmasi-transaksi.component';
import { PilihTargetComponent } from '../components/pilih-target/pilih-target.component';
import { PinComponent } from '../components/pin/pin.component';
import { PlannerDetailPortfolioComponent } from '../components/planner-detail-portfolio/planner-detail-portfolio.component';
import { PlannerListReksadanaComponent } from '../components/planner-list-reksadana/planner-list-reksadana.component';
import { PortofolioBaruComponent } from '../components/portofolio-baru/portofolio-baru.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductComponent } from '../components/product/product.component';
import { PromoKodeComponent } from '../components/promo-kode/promo-kode.component';
import { SimulasiPlannerComponent } from '../components/simulasi-planner/simulasi-planner.component';
import { SummaryPlannerComponent } from '../components/summary-planner/summary-planner.component';
import { FinancialPlannerComponent } from './financial-planner.component';

const routes: Routes = [
  { 
    path: '', 
    component:FinancialPlannerComponent,
    children: [
      { path: '', redirectTo: 'planner-list', pathMatch: 'full' },
      { path:'planner-list', component:FinancialPlannerListComponent},
      { path:'summary-planner', component:SummaryPlannerComponent},
      { path:'detail-planner', component:DetailPlannerComponent},
      { path:'detail-portfolio', component:PlannerDetailPortfolioComponent},
      { path:'beli-reksadana', component:BeliReksadanaComponent},
      { path:'promo-kode', component:PromoKodeComponent},
      { path:'product-detail', component:ProductDetailComponent},
      { path:'konfirmasi-transaksi', component:KonfirmasiTransaksiComponent},
      { path: 'pilih-target', component: PilihTargetComponent},
      { path: 'detail-portofolio', component:PortofolioBaruComponent},
      { path: 'simulasi-planner', component:SimulasiPlannerComponent},
      { path: 'detail-transaksi',component:DetailTransaksiComponent},
      { path: 'kode-pin',component:PinComponent},
      { path: 'list-reksadana',component:PlannerListReksadanaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialPlannerRoutingModule { }
