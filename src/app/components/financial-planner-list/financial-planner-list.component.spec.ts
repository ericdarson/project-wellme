import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlannerListComponent } from './financial-planner-list.component';

describe('FinancialPlannerListComponent', () => {
  let component: FinancialPlannerListComponent;
  let fixture: ComponentFixture<FinancialPlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialPlannerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
