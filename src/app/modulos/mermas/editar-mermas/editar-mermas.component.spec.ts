import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMermasComponent } from './editar-mermas.component';

describe('EditarMermasComponent', () => {
  let component: EditarMermasComponent;
  let fixture: ComponentFixture<EditarMermasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMermasComponent]
    });
    fixture = TestBed.createComponent(EditarMermasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
