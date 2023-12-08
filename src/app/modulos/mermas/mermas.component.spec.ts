import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MermasComponent } from './mermas.component';

describe('MermasComponent', () => {
  let component: MermasComponent;
  let fixture: ComponentFixture<MermasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MermasComponent]
    });
    fixture = TestBed.createComponent(MermasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
