import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackwardModuleRoutingModule } from './backward-module-routing.module';
import { BackwardModuleComponent } from './backward-module.component';
import { SharedModule } from '../shared/shared.module';
import { BackwardProjectionComponent } from '../components/backward-projection/backward-projection.component';
import { PopupSyaratKetentuanComponent } from '../popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { BackwardPembelianComponent } from '../components/backward-pembelian/backward-pembelian.component';
import { BackwardSimulasiComponent } from '../components/backward-simulasi/backward-simulasi.component';
import { BackwardListReksadanaComponent } from '../components/backward-list-reksadana/backward-list-reksadana.component';


@NgModule({
  declarations: [
    BackwardModuleComponent,
    BackwardProjectionComponent,
    PopupSyaratKetentuanComponent,
    BackwardListReksadanaComponent,
    BackwardPembelianComponent,
    BackwardSimulasiComponent,
  
  ],
  imports: [
    CommonModule,
    BackwardModuleRoutingModule,
    SharedModule
  ]
})
export class BackwardModuleModule { }
