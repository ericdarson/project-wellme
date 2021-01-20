import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulasiPlannerComponent } from './simulasi-planner.component';

describe('SimulasiPlannerComponent', () => {
  let component: SimulasiPlannerComponent;
  let fixture: ComponentFixture<SimulasiPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulasiPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulasiPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
