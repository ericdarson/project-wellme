import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialPlannerListComponent } from './components/financial-planner-list/financial-planner-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'planner-list', component: FinancialPlannerListComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
