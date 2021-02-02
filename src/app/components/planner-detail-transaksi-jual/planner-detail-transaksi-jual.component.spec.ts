import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDetailTransaksiJualComponent } from './planner-detail-transaksi-jual.component';

describe('PlannerDetailTransaksiJualComponent', () => {
  let component: PlannerDetailTransaksiJualComponent;
  let fixture: ComponentFixture<PlannerDetailTransaksiJualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerDetailTransaksiJualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerDetailTransaksiJualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
