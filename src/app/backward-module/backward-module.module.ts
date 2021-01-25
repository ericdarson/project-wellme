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
import { BackwardResultComponent } from '../components/backward-result/backward-result.component';
import { PopupTutorialBackwardComponent } from '../popup/popup-tutorial-backward/popup-tutorial-backward.component';
import { BackwardTutorialComponent } from '../components/backward-tutorial/backward-tutorial.component';


@NgModule({
  declarations: [
    BackwardModuleComponent,
    BackwardProjectionComponent,
    PopupSyaratKetentuanComponent,
    BackwardListReksadanaComponent,
    BackwardPembelianComponent,
    BackwardSimulasiComponent,
    BackwardResultComponent,
    PopupTutorialBackwardComponent,
    BackwardTutorialComponent,
  ],
  imports: [
    CommonModule,
    BackwardModuleRoutingModule,
    SharedModule
  ]
})
export class BackwardModuleModule { }
