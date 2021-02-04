import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfirmasiExitComponent } from './konfirmasi-exit.component';

describe('KonfirmasiExitComponent', () => {
  let component: KonfirmasiExitComponent;
  let fixture: ComponentFixture<KonfirmasiExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonfirmasiExitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfirmasiExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
