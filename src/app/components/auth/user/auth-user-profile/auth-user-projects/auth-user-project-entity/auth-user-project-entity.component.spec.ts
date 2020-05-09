import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserProjectEntityComponent } from './auth-user-project-entity.component';

describe('AuthUserProjectEntityComponent', () => {
  let component: AuthUserProjectEntityComponent;
  let fixture: ComponentFixture<AuthUserProjectEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUserProjectEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserProjectEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
