import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreComponent } from '../components/more/more.component';
import { NewsComponent } from '../components/news/news.component';
import { PortofolioComponent } from '../components/portofolio/portofolio.component';
import { ProductComponent } from '../components/product/product.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { IndexComponent } from './index.component';


const routes: Routes = [
  { 
    path: '', 
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'portofolio', pathMatch: 'full' },
      { path: 'portofolio', component:  PortofolioComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product', component: ProductComponent },
      { path: 'more', component: MoreComponent },
      { path: 'news', component: NewsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
