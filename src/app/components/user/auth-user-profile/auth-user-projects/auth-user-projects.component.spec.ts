import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserProjectsComponent } from './auth-user-projects.component';

describe('AuthUserProjectsComponent', () => {
  let component: AuthUserProjectsComponent;
  let fixture: ComponentFixture<AuthUserProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUserProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
