import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyaratKetentuanPembelianComponent } from './syarat-ketentuan-pembelian.component';

describe('SyaratKetentuanPembelianComponent', () => {
  let component: SyaratKetentuanPembelianComponent;
  let fixture: ComponentFixture<SyaratKetentuanPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyaratKetentuanPembelianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyaratKetentuanPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
