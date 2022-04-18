import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResPaswwordComponent } from './res-paswword.component';

describe('ResPaswwordComponent', () => {
  let component: ResPaswwordComponent;
  let fixture: ComponentFixture<ResPaswwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResPaswwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResPaswwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
