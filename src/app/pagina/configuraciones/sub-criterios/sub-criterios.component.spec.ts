import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCriteriosComponent } from './sub-criterios.component';

describe('SubCriteriosComponent', () => {
  let component: SubCriteriosComponent;
  let fixture: ComponentFixture<SubCriteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCriteriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
