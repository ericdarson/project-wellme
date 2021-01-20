import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPlannerComponent } from './summary-planner.component';

describe('SummaryPlannerComponent', () => {
  let component: SummaryPlannerComponent;
  let fixture: ComponentFixture<SummaryPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
