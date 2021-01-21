import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSyaratKetentuanComponent } from './popup-syarat-ketentuan.component';

describe('PopupSyaratKetentuanComponent', () => {
  let component: PopupSyaratKetentuanComponent;
  let fixture: ComponentFixture<PopupSyaratKetentuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSyaratKetentuanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSyaratKetentuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
