import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialodErrorComponent } from './modal-dialog-error.component';

describe('ModalDialodErrorComponent', () => {
  let component: ModalDialodErrorComponent;
  let fixture: ComponentFixture<ModalDialodErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDialodErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialodErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
