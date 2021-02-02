import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerPinJualReksadanaComponent } from './planner-pin-jual-reksadana.component';

describe('PlannerPinJualReksadanaComponent', () => {
  let component: PlannerPinJualReksadanaComponent;
  let fixture: ComponentFixture<PlannerPinJualReksadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerPinJualReksadanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerPinJualReksadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
