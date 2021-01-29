import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { PortofolioComponent } from '../components/portofolio/portofolio.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProductComponent } from '../components/product/product.component';
import { MoreComponent } from '../components/more/more.component';
import { NewsComponent } from '../components/news/news.component';
import { FailedToLoadComponent } from '../components/failed-to-load/failed-to-load.component';


@NgModule({
  declarations: [
    IndexComponent,
    PortofolioComponent,
    ProfileComponent,
    ProductComponent,
    MoreComponent,
    NewsComponent,
    
  
  ],
  imports: [
    IndexRoutingModule,
    SharedModule
  ]
})
export class IndexModule { }
