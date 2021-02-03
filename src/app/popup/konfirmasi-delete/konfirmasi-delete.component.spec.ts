import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfirmasiDeleteComponent } from './konfirmasi-delete.component';

describe('KonfirmasiDeleteComponent', () => {
  let component: KonfirmasiDeleteComponent;
  let fixture: ComponentFixture<KonfirmasiDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonfirmasiDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfirmasiDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
