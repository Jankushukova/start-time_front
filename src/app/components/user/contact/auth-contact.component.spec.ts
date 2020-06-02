import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContactComponent } from './auth-contact.component';

describe('ContactComponent', () => {
  let component: AuthContactComponent;
  let fixture: ComponentFixture<AuthContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
