import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarPeriodoComponent } from './modal-actualizar-periodo.component';

describe('ModalActualizarPeriodoComponent', () => {
  let component: ModalActualizarPeriodoComponent;
  let fixture: ComponentFixture<ModalActualizarPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarPeriodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
