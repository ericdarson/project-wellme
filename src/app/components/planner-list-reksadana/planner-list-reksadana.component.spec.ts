import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerListReksadanaComponent } from './planner-list-reksadana.component';

describe('PlannerListReksadanaComponent', () => {
  let component: PlannerListReksadanaComponent;
  let fixture: ComponentFixture<PlannerListReksadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerListReksadanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerListReksadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
