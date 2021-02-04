import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { Globals } from './globals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './components/profile/profile.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductComponent } from './components/product/product.component';
import { MoreComponent } from './components/more/more.component';
import { NewsComponent } from './components/news/news.component';
import { PortofolioComponent } from './components/portofolio/portofolio.component';
import { MatButtonModule } from '@angular/material/button';
import { FinancialPlannerListComponent } from './components/financial-planner-list/financial-planner-list.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

import { PilihTargetComponent } from './components/pilih-target/pilih-target.component';
import { PortofolioBaruComponent } from './components/portofolio-baru/portofolio-baru.component';
import { SimulasiPlannerComponent } from './components/simulasi-planner/simulasi-planner.component';
import { SummaryPlannerComponent } from './components/summary-planner/summary-planner.component';
import { BackwardProjectionComponent } from './components/backward-projection/backward-projection.component';
import { PopupSyaratKetentuanComponent } from './popup/popup-syarat-ketentuan/popup-syarat-ketentuan.component';
import { BackwardListReksadanaComponent } from './components/backward-list-reksadana/backward-list-reksadana.component';
import { BackwardPembelianComponent } from './components/backward-pembelian/backward-pembelian.component';
import { CurrencyPipe } from '@angular/common';
import { BackwardSimulasiComponent } from './components/backward-simulasi/backward-simulasi.component';
import { DetailPlannerComponent } from './components/detail-planner/detail-planner.component';

import { BeliReksadanaComponent } from './components/beli-reksadana/beli-reksadana.component';
import { PromoKodeComponent } from './components/promo-kode/promo-kode.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { KonfirmasiTransaksiComponent } from './components/konfirmasi-transaksi/konfirmasi-transaksi.component';
import { DetailTransaksiComponent } from './components/detail-transaksi/detail-transaksi.component';
import { PinComponent } from './components/pin/pin.component';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PromoDetailComponent } from './components/promo-detail/promo-detail.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import { PlannerDetailPortfolioComponent } from './components/planner-detail-portfolio/planner-detail-portfolio.component';
import { PlannerListReksadanaComponent } from './components/planner-list-reksadana/planner-list-reksadana.component';
import { CookieService } from 'ngx-cookie-service';
import { SyaratKetentuanPembelianComponent } from './popup/syarat-ketentuan-pembelian/syarat-ketentuan-pembelian.component';
import { InformasiProdukComponent } from './popup/informasi-produk/informasi-produk.component';
import { FailedToLoadComponent } from './components/failed-to-load/failed-to-load.component';
import { PlannerProductComponent } from './components/planner-product/planner-product.component';
import { PlannerEditComponent } from './components/planner-edit/planner-edit.component';
import { PlannerEditTargetComponent } from './components/planner-edit-target/planner-edit-target.component';
import { PlannerEditDataPlannerComponent } from './components/planner-edit-data-planner/planner-edit-data-planner.component';
import { PlannerEditSuccessComponent } from './components/planner-edit-success/planner-edit-success.component';
import { PlannerJualReksadanaComponent } from './components/planner-jual-reksadana/planner-jual-reksadana.component';
import { PlannerPinJualReksadanaComponent } from './components/planner-pin-jual-reksadana/planner-pin-jual-reksadana.component';
import { PlannerDetailTransaksiJualComponent } from './components/planner-detail-transaksi-jual/planner-detail-transaksi-jual.component';
import { SyaratKetentuanPenjualanComponent } from './popup/syarat-ketentuan-penjualan/syarat-ketentuan-penjualan.component';
import { KonfirmasiDeleteComponent } from './popup/konfirmasi-delete/konfirmasi-delete.component';
import { DeleteSuccessComponent } from './popup/delete-success/delete-success.component';
import { KonfirmasiExitComponent } from './popup/konfirmasi-exit/konfirmasi-exit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
    PromoDetailComponent,
    LoginPageComponent,
    PlannerDetailPortfolioComponent,
    PlannerListReksadanaComponent,
    SyaratKetentuanPembelianComponent,
    InformasiProdukComponent,
    SyaratKetentuanPenjualanComponent,
    KonfirmasiDeleteComponent,
    DeleteSuccessComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [Globals,MatDatepickerModule,CurrencyPipe,ScrollDispatcher,SessionStorageService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
