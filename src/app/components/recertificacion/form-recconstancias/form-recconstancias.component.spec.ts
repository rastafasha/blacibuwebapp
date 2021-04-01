import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecconstanciasComponent } from './form-recconstancias.component';

describe('FormRecconstanciasComponent', () => {
  let component: FormRecconstanciasComponent;
  let fixture: ComponentFixture<FormRecconstanciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecconstanciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecconstanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
