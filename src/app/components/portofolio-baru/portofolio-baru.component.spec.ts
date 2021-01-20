import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortofolioBaruComponent } from './portofolio-baru.component';

describe('PortofolioBaruComponent', () => {
  let component: PortofolioBaruComponent;
  let fixture: ComponentFixture<PortofolioBaruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortofolioBaruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortofolioBaruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
