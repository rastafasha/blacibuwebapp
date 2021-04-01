import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConferenciasComponent } from './form-conferencias.component';

describe('FormConferenciasComponent', () => {
  let component: FormConferenciasComponent;
  let fixture: ComponentFixture<FormConferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
