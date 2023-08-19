import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEmpleadoComponent } from './insert-empleado.component';

describe('InsertEmpleadoComponent', () => {
  let component: InsertEmpleadoComponent;
  let fixture: ComponentFixture<InsertEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertEmpleadoComponent]
    });
    fixture = TestBed.createComponent(InsertEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
