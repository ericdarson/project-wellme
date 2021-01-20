import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihTargetComponent } from './pilih-target.component';

describe('PilihTargetComponent', () => {
  let component: PilihTargetComponent;
  let fixture: ComponentFixture<PilihTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilihTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
