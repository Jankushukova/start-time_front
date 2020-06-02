import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProductDetailsComponent } from './auth-product-details.component';

describe('ProductDetailsComponent', () => {
  let component: AuthProductDetailsComponent;
  let fixture: ComponentFixture<AuthProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
