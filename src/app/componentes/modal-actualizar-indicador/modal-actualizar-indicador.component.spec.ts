import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarIndicadorComponent } from './modal-actualizar-indicador.component';

describe('ModalActualizarIndicadorComponent', () => {
  let component: ModalActualizarIndicadorComponent;
  let fixture: ComponentFixture<ModalActualizarIndicadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarIndicadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
