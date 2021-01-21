import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoKodeComponent } from './promo-kode.component';

describe('PromoKodeComponent', () => {
  let component: PromoKodeComponent;
  let fixture: ComponentFixture<PromoKodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoKodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoKodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
