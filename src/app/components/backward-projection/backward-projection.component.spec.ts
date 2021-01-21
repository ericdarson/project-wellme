import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardProjectionComponent } from './backward-projection.component';

describe('BackwardProjectionComponent', () => {
  let component: BackwardProjectionComponent;
  let fixture: ComponentFixture<BackwardProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardProjectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
