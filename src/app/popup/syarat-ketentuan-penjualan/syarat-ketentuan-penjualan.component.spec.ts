import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyaratKetentuanPenjualanComponent } from './syarat-ketentuan-penjualan.component';

describe('SyaratKetentuanPenjualanComponent', () => {
  let component: SyaratKetentuanPenjualanComponent;
  let fixture: ComponentFixture<SyaratKetentuanPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyaratKetentuanPenjualanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyaratKetentuanPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
