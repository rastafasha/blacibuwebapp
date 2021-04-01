import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReccertificadosComponent } from './form-reccertificados.component';

describe('FormReccertificadosComponent', () => {
  let component: FormReccertificadosComponent;
  let fixture: ComponentFixture<FormReccertificadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReccertificadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReccertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
