import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerEditTargetComponent } from './planner-edit-target.component';

describe('PlannerEditTargetComponent', () => {
  let component: PlannerEditTargetComponent;
  let fixture: ComponentFixture<PlannerEditTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerEditTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerEditTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
