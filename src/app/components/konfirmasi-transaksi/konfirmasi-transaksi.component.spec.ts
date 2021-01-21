import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfirmasiTransaksiComponent } from './konfirmasi-transaksi.component';

describe('KonfirmasiTransaksiComponent', () => {
  let component: KonfirmasiTransaksiComponent;
  let fixture: ComponentFixture<KonfirmasiTransaksiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonfirmasiTransaksiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfirmasiTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
