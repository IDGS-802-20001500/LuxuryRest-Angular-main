import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMensajeComponent } from './dialog-mensaje.component';

describe('DialogMensajeComponent', () => {
  let component: DialogMensajeComponent;
  let fixture: ComponentFixture<DialogMensajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMensajeComponent]
    });
    fixture = TestBed.createComponent(DialogMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

