import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackwardListReksadanaComponent } from '../components/backward-list-reksadana/backward-list-reksadana.component';
import { BackwardPembelianComponent } from '../components/backward-pembelian/backward-pembelian.component';
import { BackwardProjectionComponent } from '../components/backward-projection/backward-projection.component';
import { BackwardResultComponent } from '../components/backward-result/backward-result.component';
import { BackwardSimulasiComponent } from '../components/backward-simulasi/backward-simulasi.component';
import { BackwardTutorialComponent } from '../components/backward-tutorial/backward-tutorial.component';
import { BackwardModuleComponent } from './backward-module.component';

const routes: Routes = [
  { 
    path: '', 
    component: BackwardModuleComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component:BackwardProjectionComponent},
      { path: 'backward-list-reksadana/:id', component:BackwardListReksadanaComponent},
      { path: 'backward-pembelian/:id', component:BackwardPembelianComponent},
      { path: 'backward-simulasi/:id', component:BackwardSimulasiComponent},
      { path: 'backward-result', component:BackwardResultComponent},
      { path: 'backward-tutorial/:id', component:BackwardTutorialComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackwardModuleRoutingModule { }
