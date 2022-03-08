import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarCriterioComponent } from './modal-actualizar-criterio.component';

describe('ModalActualizarCriterioComponent', () => {
  let component: ModalActualizarCriterioComponent;
  let fixture: ComponentFixture<ModalActualizarCriterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarCriterioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarCriterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
