import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecconferenciasComponent } from './form-recconferencias.component';

describe('FormRecconferenciasComponent', () => {
  let component: FormRecconferenciasComponent;
  let fixture: ComponentFixture<FormRecconferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecconferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecconferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
