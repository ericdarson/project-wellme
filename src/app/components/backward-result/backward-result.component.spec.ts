import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardResultComponent } from './backward-result.component';

describe('BackwardResultComponent', () => {
  let component: BackwardResultComponent;
  let fixture: ComponentFixture<BackwardResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
