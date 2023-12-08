import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertComprasComponent } from './insert-compras.component';

describe('InsertComprasComponent', () => {
  let component: InsertComprasComponent;
  let fixture: ComponentFixture<InsertComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertComprasComponent]
    });
    fixture = TestBed.createComponent(InsertComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
