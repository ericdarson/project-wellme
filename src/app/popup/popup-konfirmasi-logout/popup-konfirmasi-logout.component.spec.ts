import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupKonfirmasiLogoutComponent } from './popup-konfirmasi-logout.component';

describe('PopupKonfirmasiLogoutComponent', () => {
  let component: PopupKonfirmasiLogoutComponent;
  let fixture: ComponentFixture<PopupKonfirmasiLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupKonfirmasiLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupKonfirmasiLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
