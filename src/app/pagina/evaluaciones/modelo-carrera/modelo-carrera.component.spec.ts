import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloCarreraComponent } from './modelo-carrera.component';

describe('ModeloCarreraComponent', () => {
  let component: ModeloCarreraComponent;
  let fixture: ComponentFixture<ModeloCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeloCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
