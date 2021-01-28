import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardSimulasiComponent } from './backward-simulasi.component';

describe('BackwardSimulasiComponent', () => {
  let component: BackwardSimulasiComponent;
  let fixture: ComponentFixture<BackwardSimulasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackwardSimulasiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardSimulasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
