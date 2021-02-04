import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerEditConfirmationComponent } from './planner-edit-confirmation.component';

describe('PlannerEditConfirmationComponent', () => {
  let component: PlannerEditConfirmationComponent;
  let fixture: ComponentFixture<PlannerEditConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerEditConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerEditConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
