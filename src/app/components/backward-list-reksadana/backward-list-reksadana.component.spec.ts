import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardListReksadanaComponent } from './backward-list-reksadana.component';

describe('BackwardListReksadanaComponent', () => {
  let component: BackwardListReksadanaComponent;
  let fixture: ComponentFixture<BackwardListReksadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardListReksadanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardListReksadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
