import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarModeloCarreraComponent } from './modal-actualizar-modelo-carrera.component';

describe('ModalActualizarModeloCarreraComponent', () => {
  let component: ModalActualizarModeloCarreraComponent;
  let fixture: ComponentFixture<ModalActualizarModeloCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarModeloCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarModeloCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
