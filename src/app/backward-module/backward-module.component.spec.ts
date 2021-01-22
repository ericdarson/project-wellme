import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardModuleComponent } from './backward-module.component';

describe('BackwardModuleComponent', () => {
  let component: BackwardModuleComponent;
  let fixture: ComponentFixture<BackwardModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
