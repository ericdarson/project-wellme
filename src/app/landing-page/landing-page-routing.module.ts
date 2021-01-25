import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexModule } from '../index/index.module';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: LandingPageComponent,
    children: [
       { path: 'index',  loadChildren: () => IndexModule },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
