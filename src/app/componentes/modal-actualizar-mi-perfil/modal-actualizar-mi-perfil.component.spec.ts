import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarMiPerfilComponent } from './modal-actualizar-mi-perfil.component';

describe('ModalActualizarMiPerfilComponent', () => {
  let component: ModalActualizarMiPerfilComponent;
  let fixture: ComponentFixture<ModalActualizarMiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarMiPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
