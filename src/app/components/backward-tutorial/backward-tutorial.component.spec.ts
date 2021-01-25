import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardTutorialComponent } from './backward-tutorial.component';

describe('BackwardTutorialComponent', () => {
  let component: BackwardTutorialComponent;
  let fixture: ComponentFixture<BackwardTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
