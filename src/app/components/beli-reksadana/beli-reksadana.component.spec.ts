import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeliReksadanaComponent } from './beli-reksadana.component';

describe('BeliReksadanaComponent', () => {
  let component: BeliReksadanaComponent;
  let fixture: ComponentFixture<BeliReksadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeliReksadanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeliReksadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
