import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialPlannerListComponent } from './components/financial-planner-list/financial-planner-list.component';
import { HomeComponent } from './components/home/home.component';
import { IndexModule } from './index/index.module';

import { PilihTargetComponent } from './components/pilih-target/pilih-target.component';
import { PortofolioBaruComponent } from './components/portofolio-baru/portofolio-baru.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SimulasiPlannerComponent } from './components/simulasi-planner/simulasi-planner.component';
import { SummaryPlannerComponent } from './components/summary-planner/summary-planner.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
 
  { path: 'planner-list', component: FinancialPlannerListComponent },
  { path: 'index',  loadChildren: () => IndexModule },
  { path: 'pilih-target', component: PilihTargetComponent},
  { path: 'detail-portofolio', component:PortofolioBaruComponent},
<<<<<<< HEAD
  { path: 'simulasi-planner', component:SimulasiPlannerComponent},
  { path:'summary-planner', component:SummaryPlannerComponent}
=======
  { path: 'simulasi-planner', component:SimulasiPlannerComponent}

>>>>>>> 2a3a26ec7c2125c1f03a21d2b23835cd956b015a
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
