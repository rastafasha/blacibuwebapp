import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCertificadosComponent } from './form-certificados.component';

describe('FormCertificadosComponent', () => {
  let component: FormCertificadosComponent;
  let fixture: ComponentFixture<FormCertificadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCertificadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
