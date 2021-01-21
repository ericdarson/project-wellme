import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardPembelianComponent } from './backward-pembelian.component';

describe('BackwardPembelianComponent', () => {
  let component: BackwardPembelianComponent;
  let fixture: ComponentFixture<BackwardPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardPembelianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
