import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserInfromationComponent } from './auth-user-infromation.component';

describe('AuthUserInfromationComponent', () => {
  let component: AuthUserInfromationComponent;
  let fixture: ComponentFixture<AuthUserInfromationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUserInfromationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserInfromationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
