import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecertificacionComponent } from './recertificacion.component';

describe('RecertificacionComponent', () => {
  let component: RecertificacionComponent;
  let fixture: ComponentFixture<RecertificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecertificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecertificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
