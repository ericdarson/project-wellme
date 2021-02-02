import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerEditSuccessComponent } from './planner-edit-success.component';

describe('PlannerEditSuccessComponent', () => {
  let component: PlannerEditSuccessComponent;
  let fixture: ComponentFixture<PlannerEditSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerEditSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerEditSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
