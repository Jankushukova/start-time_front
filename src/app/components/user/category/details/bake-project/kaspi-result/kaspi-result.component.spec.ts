import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaspiResultComponent } from './kaspi-result.component';

describe('KaspiResultComponent', () => {
  let component: KaspiResultComponent;
  let fixture: ComponentFixture<KaspiResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaspiResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaspiResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
