import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarSubcriterioComponent } from './modal-actualizar-subcriterio.component';

describe('ModalActualizarSubcriterioComponent', () => {
  let component: ModalActualizarSubcriterioComponent;
  let fixture: ComponentFixture<ModalActualizarSubcriterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarSubcriterioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarSubcriterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
