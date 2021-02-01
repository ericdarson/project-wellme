import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerEditDataPlannerComponent } from './planner-edit-data-planner.component';

describe('PlannerEditDataPlannerComponent', () => {
  let component: PlannerEditDataPlannerComponent;
  let fixture: ComponentFixture<PlannerEditDataPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerEditDataPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerEditDataPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
