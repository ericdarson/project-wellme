import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTutorialBackwardComponent } from './popup-tutorial-backward.component';

describe('PopupTutorialBackwardComponent', () => {
  let component: PopupTutorialBackwardComponent;
  let fixture: ComponentFixture<PopupTutorialBackwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTutorialBackwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTutorialBackwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
