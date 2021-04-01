import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatospersonalesComponent } from './form-datospersonales.component';

describe('FormDatospersonalesComponent', () => {
  let component: FormDatospersonalesComponent;
  let fixture: ComponentFixture<FormDatospersonalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDatospersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatospersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
