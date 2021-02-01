import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerProductComponent } from './planner-product.component';

describe('PlannerProductComponent', () => {
  let component: PlannerProductComponent;
  let fixture: ComponentFixture<PlannerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
