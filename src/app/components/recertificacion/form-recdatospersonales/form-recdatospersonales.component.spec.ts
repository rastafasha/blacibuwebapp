import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecdatospersonalesComponent } from './form-recdatospersonales.component';

describe('FormRecdatospersonalesComponent', () => {
  let component: FormRecdatospersonalesComponent;
  let fixture: ComponentFixture<FormRecdatospersonalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecdatospersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecdatospersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
