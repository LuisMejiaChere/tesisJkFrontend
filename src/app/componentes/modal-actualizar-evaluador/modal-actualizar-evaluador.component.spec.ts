import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarEvaluadorComponent } from './modal-actualizar-evaluador.component';

describe('ModalActualizarEvaluadorComponent', () => {
  let component: ModalActualizarEvaluadorComponent;
  let fixture: ComponentFixture<ModalActualizarEvaluadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarEvaluadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarEvaluadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
