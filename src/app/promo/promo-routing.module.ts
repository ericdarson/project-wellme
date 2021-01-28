import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromoDetailComponent } from '../components/promo-detail/promo-detail.component';
import { PromoListComponent } from '../components/promo-list/promo-list.component';
import { PromoComponent } from './promo.component';


const routes: Routes = [
  { 
    path: '', 
    component:PromoComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path:'list', component:PromoListComponent},
      { path:'detail', component:PromoDetailComponent}
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoRoutingModule { }
