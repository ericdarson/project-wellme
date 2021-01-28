import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformasiProdukComponent } from './informasi-produk.component';

describe('InformasiProdukComponent', () => {
  let component: InformasiProdukComponent;
  let fixture: ComponentFixture<InformasiProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformasiProdukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformasiProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
