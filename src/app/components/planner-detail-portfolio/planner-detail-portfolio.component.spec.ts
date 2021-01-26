import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDetailPortfolioComponent } from './planner-detail-portfolio.component';

describe('PlannerDetailPortfolioComponent', () => {
  let component: PlannerDetailPortfolioComponent;
  let fixture: ComponentFixture<PlannerDetailPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerDetailPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerDetailPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
