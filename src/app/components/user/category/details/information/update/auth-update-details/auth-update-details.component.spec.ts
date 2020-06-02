import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUpdateDetailsComponent } from './auth-update-details.component';

describe('AuthUpdateDetailsComponent', () => {
  let component: AuthUpdateDetailsComponent;
  let fixture: ComponentFixture<AuthUpdateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUpdateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
