import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerEditComponent } from './planner-edit.component';

describe('PlannerEditComponent', () => {
  let component: PlannerEditComponent;
  let fixture: ComponentFixture<PlannerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
