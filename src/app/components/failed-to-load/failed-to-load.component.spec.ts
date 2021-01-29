import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedToLoadComponent } from './failed-to-load.component';

describe('FailedToLoadComponent', () => {
  let component: FailedToLoadComponent;
  let fixture: ComponentFixture<FailedToLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedToLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedToLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
