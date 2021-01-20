import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialPlannerListComponent } from './components/financial-planner-list/financial-planner-list.component';
import { HomeComponent } from './components/home/home.component';
import { MoreComponent } from './components/more/more.component';
import { NewsComponent } from './components/news/news.component';
import { PortofolioComponent } from './components/portofolio/portofolio.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IndexModule } from './index/index.module';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
 
  { path: 'planner-list', component: FinancialPlannerListComponent },
  { path: 'index',  loadChildren: () => IndexModule },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
