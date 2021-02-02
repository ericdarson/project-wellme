import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerJualReksadanaComponent } from './planner-jual-reksadana.component';

describe('PlannerJualReksadanaComponent', () => {
  let component: PlannerJualReksadanaComponent;
  let fixture: ComponentFixture<PlannerJualReksadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerJualReksadanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerJualReksadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
