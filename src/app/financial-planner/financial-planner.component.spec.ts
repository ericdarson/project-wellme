import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlannerComponent } from './financial-planner.component';

describe('FinancialPlannerComponent', () => {
  let component: FinancialPlannerComponent;
  let fixture: ComponentFixture<FinancialPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
