import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarEvidenciaComponent } from './modal-actualizar-evidencia.component';

describe('ModalActualizarEvidenciaComponent', () => {
  let component: ModalActualizarEvidenciaComponent;
  let fixture: ComponentFixture<ModalActualizarEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarEvidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
